import { uploadToCloudinary } from "../config/cloudinary.js";

export async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      size,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0]?.path;
    const image2 = req.files.image2 && req.files.image2[0]?.path;
    const image3 = req.files.image3 && req.files.image3[0]?.path;
    const image4 = req.files.image4 && req.files.image4[0]?.path;

    const imagesUrl = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let images = await Promise.all(
      imagesUrl.map(async (item) => {
        await uploadToCloudinary(item);
      })
    );

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
    });

    // if (
    //   !name ||
    //   !description ||
    //   !price ||
    //   !category ||
    //   !subCategory ||
    //   !size ||
    //   !date
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Inputs are required",
    //   });
    // }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding product",
    });
  }
}

export async function listProducts() {}

export async function removeProduct() {}

export async function singleProduct() {}
