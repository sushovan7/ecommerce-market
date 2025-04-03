import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import { connectDb } from "./DB/db.js";
import { userRouter } from "./routes/user.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { orderRouter } from "./routes/order.routes.js";

const app = express();
app.use(
  cors({
    origin: [
      "https://ecommercemarketadmin.vercel.app", // admin URL
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

// connectDb()
//   .then(() => {
//     if (process.env.NODE_ENV !== "production") {
//       app.listen(process.env.PORT || 8000, () => {
//         console.log("Server running on port:", process.env.PORT || 8000);
//       });
//     }
//   })
//   .catch((err) => {
//     console.log("mongodb connection error: ", err);
//   });

export default app;

if (process.env.NODE_ENV !== "production") {
  connectDb()
    .then(() => {
      app.listen(process.env.PORT || 8000, () => {
        console.log("Server running on port:", process.env.PORT || 8000);
      });
    })
    .catch((err) => {
      console.log("MongoDB connection error:", err);
    });
}
