import express from "express";
import { runCode, fetchCodes } from "../controllers/codeController.js";

const router = express.Router();

router.post("/run", runCode);
router.get("/", fetchCodes);

export default router;
