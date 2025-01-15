import express from "express";
import {
  signup,
  signin,
  logout,
  verifyUserEmail,
  resetPassword,
  sendResetPasswordOtp,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/logout", auth, logout);
userRouter.post("/verify-email", verifyUserEmail);
userRouter.post("/reset-password-otp", sendResetPasswordOtp);
userRouter.post("/reset-password", resetPassword);
