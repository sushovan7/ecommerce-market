import express from "express";
import {
  signup,
  signin,
  logout,
  verifyUserEmail,
  resetPassword,
  sendResetPasswordOtp,
  refreshAccessToken,
} from "../controllers/auth.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/logout", auth, logout);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.post("/verify-email", verifyUserEmail);
authRouter.post("/reset-password-otp", sendResetPasswordOtp);
authRouter.post("/reset-password", resetPassword);
