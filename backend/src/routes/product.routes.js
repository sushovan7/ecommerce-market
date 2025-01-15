import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

export const productRouter = express.Router();

productRouter.post(
  "/add-product",
  adminAuth,
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    {
      name: "image2",
      maxCount: 1,
    },
    {
      name: "image3",
      maxCount: 1,
    },
    {
      name: "image4",
      maxCount: 1,
    },
  ]),
  addProduct
);
productRouter.get("/list-products", adminAuth, listProducts);
productRouter.post("/remove-product", adminAuth, removeProduct);
productRouter.get("/single-product", adminAuth, singleProduct);
