import Code from "../models/code.js";
import { executeCode } from "../utils/execute.js";

export const runAndSaveCode = async (language, code) => {
  const output = await executeCode(language, code);
  const newCode = new Code({ language, code, output });
  await newCode.save();
  return output;
};

export const getAllCodes = async () => {
  return await Code.find().sort({ createdAt: -1 });
};
