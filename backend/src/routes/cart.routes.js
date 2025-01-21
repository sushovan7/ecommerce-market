import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getUserCartdata,
  updateUserCart,
} from "../controllers/cart.controller.js";

export const cartRouter = express.Router();

cartRouter.post("/add-to-cart", auth, addToCart);
cartRouter.post("/update-cart", auth, updateUserCart);
cartRouter.get("/get-cartdata", auth, getUserCartdata);
