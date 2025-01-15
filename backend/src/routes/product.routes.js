import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";

export const productRouter = express.Router();

productRouter.post(
  "/add-product",
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
productRouter.get("/list-products", listProducts);
productRouter.post("/remove-product", removeProduct);
productRouter.get("/single-product", singleProduct);
