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
const port = process.env.PORT || 8000;

console.log(process.env);
// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5173",
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "E-commerce API is running" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on port:", port);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error: ", err);
  });
