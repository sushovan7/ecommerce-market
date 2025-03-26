import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export async function auth(req, res, next) {
  const token = req.headers?.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized request",
    });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await userModel
      .findById(decodedToken?._id)
      .select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Invalid token",
      error,
    });
  }
}
