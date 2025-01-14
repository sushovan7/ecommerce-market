import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export async function generateToken(_id) {
  try {
    await userModel.findById(_id);

    const token = jwt.sign(
      {
        _id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    return {
      token,
    };
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating  token and  token",
    });
  }
}
