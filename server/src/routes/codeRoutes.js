import express from "express";
import { runCode, fetchCodes } from "../controllers/codeController.js";

const router = express.Router();

// POST /api/codes/run - Execute code
router.post("/run", runCode);

// GET /api/codes - Get all saved codes
router.get("/", fetchCodes);

export default router;
