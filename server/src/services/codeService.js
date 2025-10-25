import Code from "../models/code.js";
import { executeCode } from "../utils/execute.js";

export const runAndSaveCode = async (language, code) => {
  try {
    console.log("🔄 Executing code...");
    const output = await executeCode(language, code);

    console.log("💾 Saving to database...");
    const newCode = new Code({ language, code, output });
    await newCode.save();

    console.log("✅ Code saved successfully");
    return output;
  } catch (error) {
    console.error("❌ Error in runAndSaveCode:", error.message);
    throw new Error(`Execution failed: ${error.message}`);
  }
};

export const getAllCodes = async () => {
  try {
    return await Code.find().sort({ createdAt: -1 }).limit(50);
  } catch (error) {
    console.error("❌ Error fetching codes:", error.message);
    throw new Error(`Database query failed: ${error.message}`);
  }
};
