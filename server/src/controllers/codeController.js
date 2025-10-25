import { runAndSaveCode, getAllCodes } from "../services/codeService.js";

export const runCode = async (req, res, next) => {
  try {
    console.log("📥 Received request:", {
      language: req.body.language,
      codeLength: req.body.code?.length,
    });

    const { language, code } = req.body;

    // Validation
    if (!language || !code) {
      console.log("❌ Validation failed: Missing fields");
      return res.status(400).json({
        error: "Missing required fields: language and code",
      });
    }

    if (!["javascript", "python"].includes(language)) {
      console.log("❌ Unsupported language:", language);
      return res.status(400).json({
        error: `Unsupported language: ${language}. Use 'javascript' or 'python'`,
      });
    }

    console.log(`🔄 Executing ${language} code...`);
    const output = await runAndSaveCode(language, code);

    console.log("✅ Code executed successfully");
    res.status(200).json({ output });
  } catch (error) {
    console.error("❌ Error in runCode controller:", error);
    // Pass to global error handler
    next(error);
  }
};

export const fetchCodes = async (req, res, next) => {
  try {
    console.log("📥 Fetching all codes...");
    const codes = await getAllCodes();
    console.log(`✅ Found ${codes.length} codes`);
    res.status(200).json(codes);
  } catch (error) {
    console.error("❌ Error in fetchCodes controller:", error);
    next(error);
  }
};
