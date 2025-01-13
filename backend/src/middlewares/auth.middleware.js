import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

export async function auth(req, res, next) {
  const token =
    req.headers?.accessToken ||
    req.headers["Authorization"]?.replace("Bearer ", "");
  console.log(JSON.stringify(req.cookies));
  console.log(req.headers["Authorization"]?.replace("Bearer ", ""));

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Unauthorized request",
    });
  }
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  try {
    const user = await userModel
      .findById(decodedToken?._id)
      .select("-password -refreshToken");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Invalid access token",
      error,
    });
  }
}
