import mongoose from "mongoose";

export async function connectDb() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`
    );
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.log("mongodb connection failed: ", error);
    throw new Error();
  }
}
