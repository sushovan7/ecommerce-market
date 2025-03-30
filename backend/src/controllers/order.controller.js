import { orderModel } from "../models/order.models.js";
import { userModel } from "../models/user.model.js";
import Stripe from "stripe";

const currency = "usd";
const deliveryCharge = 10;

const stripe = new Stripe(
  "sk_test_51R8O3hI0GOviTj8RCZQRZnMJ7OyjeG7pmDfk0cuYxftb3xe09um9F9LFN6gI4oXLzMakL0oSoVecb8Q1p0jqCMMB0081QDO4r3"
);

export async function placeOrder(req, res) {
  try {
    const { orderData } = req.body;
    const { items, amount, address, phone } = orderData;
    console.log(items, amount, address);

    const userId = req.user._id;
    const orderDataToSave = {
      userId,
      items,
      amount,
      address,
      phone,
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

export async function placeOrderStripe(req, res) {
  try {
    const { items, amount, address, phone } = req.body.orderData;
    const { origin } = req.headers;

    const userId = req.user._id;

    const orderDataToSave = {
      userId,
      items,
      amount,
      address,
      phone,
      paymentMethod: "Stripe",
      payment: false, // Initially payment status is false
    };

    const newOrder = new orderModel(orderDataToSave);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: deliveryCharge * 100, // Convert to cents
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.status(200).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error placing order with Stripe:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Stripe session",
      error: error.message,
    });
  }
}

export async function verifyStripe(req, res) {
  try {
    const userId = req.user._id;
    const { orderId, success } = req.body;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.status(200).json({
        success: true,
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function allOrders(req, res) {
  try {
    const orders = await orderModel.find({});
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to fetch orders",
      error: error.message,
    });
  }
}

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
