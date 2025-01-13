import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import transporter from "../nodemailer/nodemailer.config.js";
import {
  welcomeEmail,
  verifyEmail,
  resetPasswordOtp,
} from "../utils/emailTemplates.js";
import { generateAccessTokenAndRefreshToken } from "../utils/generateAccessTokenAndRefreshToken.js";

export async function signup(req, res) {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All the inputs fields are required",
    });
  }

  try {
    const checkingEmailAlreadyExists = await userModel.findOne({
      email,
    });
    if (checkingEmailAlreadyExists) {
      return res.status(409).json({
        message: "Email already exists in our database",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 90000);

    const userInfo = await userModel.create({
      fullname: fullname.toLowerCase(),
      email,
      password: hashPassword,
      generateEmailVerifyOtp: otp,
      emailVerifyOtpExpiresAt: Date.now() + 15 * 60 * 1000,
    });

    const userCreated = await userModel
      .findById(userInfo._id)
      .select(
        "-password -updatedAt -createdAt -emailVerifyOtpExpiresAt -lastLogin"
      );

    if (!userCreated) {
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }

    await transporter.sendMail({
      from: "bhattaraisushovan999@gmail.com",
      to: email,
      subject: "Welcome to Our E-commerce",
      html: welcomeEmail
        .replace("[User's Name]", fullname)
        .replace("[OTP_CODE]", userCreated.generateEmailVerifyOtp),
    });

    return res.status(201).json({
      success: true,
      message: `Signup successful. Verify your email with the OTP sent to your email address :${email}`,
      user: userCreated,
    });
  } catch (error) {
    console.error("Signup error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password is required",
    });
  }

  try {
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User do not exist on our database, Please Sign up",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const { refreshToken, accessToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await userModel
      .findOne(user._id)
      .select("-refreshToken -password");

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "Strict",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "User loggedIn successfully",
        user: loggedInUser,
      });
  } catch (error) {
    console.log("error while Sign In", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function logout(req, res) {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            refreshToken: null,
          },
        },
        {
          new: true,
        }
      )
      .select("-password -refreshToken");

    return res
      .status(200)
      .clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "Strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "User logged out successfully",
        user: updatedUser,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to log out",
      error: error.message,
    });
  }
}

export async function refreshAccessToken(req, res) {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.satus(400).json({
      success: false,
      message: "unauthorized request",
    });
  }
  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await userModel.findById(decodeToken?._id);

    if (!user) {
      return res.satus(400).json({
        success: false,
        message: "invalid refresh token",
      });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.satus(400).json({
        success: false,
        message: "refresh token is expired or used",
      });
    }

    const { accessToken, newrefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
      })
      .cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        secure: true,
      })
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newrefreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
}

export async function verifyUserEmail(req, res) {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    res.status(400).json({
      success: false,
      message: "User ID and OTP are required",
    });
  }
  try {
    const user = await userModel
      .findById(userId)
      .select(
        "-password -updatedAt -createdAt -emailVerifyOtpExpiresAt -lastLogin"
      );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.generateEmailVerifyOtp !== otp || user.otpExpiresAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.generateEmailVerifyOtp = null;
    user.emailVerifyOtpExpiresAt = null;
    await user.save();

    await transporter.sendMail({
      from: "bhattaraisushovan999@gmail.com",
      to: user.email,
      subject: "Verify Email With OTP",
      html: verifyEmail.replace("[User's Name]", user.fullname),
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: user,
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function sendResetPasswordOtp(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "email is required",
    });
  }
  try {
    const user = await userModel
      .findOne({
        email,
      })
      .select("-password");

    if (!user) {
      return res.status(400).json({
        success: "User not found with provide email",
        message: false,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 90000);
    const resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000;
    user.resetPasswordOtp = otp;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();

    await transporter.sendMail({
      from: "bhattaraisushovan999@gmail.com",
      to: email,
      subject: "OTP for resetting password",
      html: resetPasswordOtp
        .replace("[User's Name]", user.fullname)
        .replace("[OTP_CODE]", user.resetPasswordOtp),
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("error reseting password");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required",
    });
  }

  try {
    const user = await userModel
      .findOne({
        email,
      })
      .select("-password");

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User not found",
      });
    }
    if (
      user.resetPasswordOtp !== otp ||
      user.resetPasswordExpiresAt < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid or Expired",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordExpiresAt = null;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password has been successfully reset. Pleas Log In ",
    });
  } catch (error) {
    console.log("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while resetting the password.",
    });
  }
}
