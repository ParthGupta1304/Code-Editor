import dotenv from "dotenv";
dotenv.config(); // Load FIRST before anything else

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import codeRoutes from "./src/routes/codeRoutes.js";

const app = express();

// Enable CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "✅ Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/codes", codeRoutes);

// Global error handler - CRITICAL for catching async errors
app.use((err, req, res, next) => {
  console.error("❌ Global Error Handler:", err);
  res.status(500).json({
    error: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api/codes/run`);
  console.log(`📍 Health: http://localhost:${PORT}/`);
});

export default app;
