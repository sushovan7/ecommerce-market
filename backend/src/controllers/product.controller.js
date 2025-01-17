import { uploadToCloudinary } from "../config/cloudinary.js";
import { productModel } from "../models/product.model.js";

export async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !sizes ||
      bestseller === undefined ||
      bestseller === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Inputs are required",
      });
    }

    const image1 = req.files.image1 && req.files.image1[0]?.path;
    const image2 = req.files.image2 && req.files.image2[0]?.path;
    const image3 = req.files.image3 && req.files.image3[0]?.path;
    const image4 = req.files.image4 && req.files.image4[0]?.path;

    const imagesUrl = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const requiredImages = await Promise.all(
      imagesUrl.map((item) => uploadToCloudinary(item))
    );

    const images = requiredImages.map((item) => item.url);

    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
      images: images,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding product",
    });
  }
}

export async function listProducts(req, res) {
  try {
    const products = await productModel.find({});
    if (!products) {
      return res.status(400).json({
        success: "false",
        message: "No products to be found",
      });
    }

    return res.status(200).json({
      success: "true",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all products",
    });
  }
}

export async function removeProduct(req, res) {
  console.log(req.body.id);
  try {
    await productModel.findByIdAndDelete(req.body.id);
    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
}

export async function singleProduct(req, res) {
  try {
    const product = await productModel.findById(req.body._id);
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetchproduct",
    });
  }
}
