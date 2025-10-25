import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import codeRoutes from "./src/routes/codeRoutes.js";
const app = express();

dotenv.config();

// Enable CORS for frontend requests with detailed configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
// CORS middleware applied above handles preflight OPTIONS requests for defined origins.

// Middleware
app.use(express.json());

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 3000;
app.use("/api/codes", codeRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
export default app;
