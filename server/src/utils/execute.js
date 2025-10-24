import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const __dirname = path.resolve();

export const executeCode = (language, code) => {
  return new Promise((resolve, reject) => {
    const jobId = uuid();
    let filePath;

    if (language === "javascript")
      filePath = path.join(__dirname, `${jobId}.js`);
    else if (language === "python")
      filePath = path.join(__dirname, `${jobId}.py`);
    else return reject("Unsupported language");

    fs.writeFileSync(filePath, code);

    const command =
      language === "javascript"
        ? `node "${filePath}"`
        : `python3 "${filePath}"`;

    exec(command, (error, stdout, stderr) => {
      fs.unlinkSync(filePath);

      if (error) return reject(stderr || error.message);
      resolve(stdout);
    });
  });
};
