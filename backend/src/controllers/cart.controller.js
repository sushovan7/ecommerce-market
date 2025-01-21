// add products to user cart

import { userModel } from "../models/user.model.js";

export async function addToCart(req, res) {
  try {
    const { productId, size } = req.body;
    const userData = await userModel.findById(req.user._id);
    let cartData = await userData.cartData;

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }

    await userModel.findByIdAndUpdate(req.user._id, {
      cartData,
    });

    return res.status(200).json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add to cart",
    });
  }
}

export async function updateUserCart(req, res) {
  try {
    const { productId, size, quantity } = req.body;

    // Fetch user's cart data
    const user = await userModel.findById(req.user._id);

    // Ensure cartData is initialized
    if (!user.cartData) {
      user.cartData = {};
    }

    // Ensure productId exists in cartData
    if (!user.cartData[productId]) {
      user.cartData[productId] = {};
    }

    // Update the size entry for the productId
    user.cartData[productId][size] = quantity;

    // Save the updated data
    await userModel.findByIdAndUpdate(req.user._id, {
      cartData: user.cartData,
    });

    return res.status(200).json({
      success: true,
      message: "Cart updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message,
    });
  }
}

export async function getUserCartdata(req, res) {
  console.log("hello");
  try {
    const userData = await userModel.findById(req.user._id);
    let cartData = userData.cartData;
    return res.status(200).json({
      success: true,
      cartData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cartdata",
    });
  }
}
