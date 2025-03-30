import { orderModel } from "../models/order.models.js";
import { userModel } from "../models/user.model.js";

export async function placeOrder(req, res) {
  try {
    const { orderData } = req.body;
    const { items, amount, address } = orderData;
    console.log(items, amount, address);

    const userId = req.user._id;
    const orderDataToSave = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      payment: false,
    };

    const newOrder = new orderModel(orderDataToSave);

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.status(200).json({
      success: true,
      message: "Order placed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
}

export async function placeOrderStripe() {}

export async function allOrders() {}

export async function userOrders(req, res) {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ userId });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to fetch products",
      error: error.message,
    });
  }
}

export async function updateStatus() {}
