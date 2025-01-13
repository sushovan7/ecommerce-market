import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export async function generateAccessTokenAndRefreshToken(_id) {
  try {
    const user = await userModel.findById(_id);
    const refreshToken = jwt.sign(
      {
        _id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    const accessToken = jwt.sign(
      {
        _id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    user.refreshToken = refreshToken;
    user.save();

    return {
      refreshToken,
      accessToken,
    };
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while generating access token and refresh token",
    });
  }
}
