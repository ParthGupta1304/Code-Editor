import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import codeRoutes from "./src/routes/codeRoutes.js";
const app = express();

dotenv.config();

app.use(express.json());

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 5000;
app.use("/api/codes", codeRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
export default app;
