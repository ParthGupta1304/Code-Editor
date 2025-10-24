import { runAndSaveCode, getAllCodes } from "../services/codeService.js";

export const runCode = async (req, res) => {
  const { language, code } = req.body;

  try {
    const output = await runAndSaveCode(language, code);
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const fetchCodes = async (req, res) => {
  try {
    const codes = await getAllCodes();
    res.status(200).json(codes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
