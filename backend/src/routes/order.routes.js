import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/order.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

export const orderRouter = express.Router();

orderRouter.get("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/stripe", auth, placeOrderStripe);

orderRouter.get("/userorders", auth, userOrders);
orderRouter.post("/verifyStripe", auth, verifyStripe);
