import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import { connectDb } from "./DB/db.js";
import { userRouter } from "./routes/user.routes.js";
import { productRouter } from "./routes/product.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, function () {
      console.log("app is listening on port :", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error: ", err);
  });
