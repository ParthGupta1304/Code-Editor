import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
const app = express();

dotenv.config();

app.use(express.json());

connectDB(); // Connect to MongoDB

