import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
const app = express();
dotenv.config();
app.use(express.json());
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error(
    "❌ MONGODB_URI is not defined. Add it to a .env file or your environment variables."
  );
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });
