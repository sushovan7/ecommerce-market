import app from "./index.js";
import { connectDb } from "./DB/db.js";

export default async function handler(req, res) {
  await connectDb();
  return app(req, res);
}
