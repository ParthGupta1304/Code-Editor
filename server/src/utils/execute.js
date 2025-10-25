import { spawn } from "child_process";

// Execute code without creating temp files. Streams the code to the interpreter via stdin.
export const executeCode = (language, code) => {
  return new Promise((resolve, reject) => {
    let proc;
    const TIMEOUT_MS = 10000;

    try {
      if (language === "javascript") {
        // Node supports reading script from stdin with '-'
        proc = spawn("node", ["-"], {
          stdio: ["pipe", "pipe", "pipe"],
        });
      } else if (language === "python") {
        // Python reads script from stdin with '-'
        proc = spawn("python3", ["-"], {
          stdio: ["pipe", "pipe", "pipe"],
        });
      } else {
        return reject(new Error(`Unsupported language: ${language}`));
      }

      let stdout = "";
      let stderr = "";
      let finished = false;

      // Timeout guard
      const timer = setTimeout(() => {
        if (finished) return;
        finished = true;
        try {
          proc.kill("SIGKILL");
        } catch {}
        reject(new Error("Execution timed out"));
      }, TIMEOUT_MS);

      proc.stdout.on("data", (data) => {
        stdout += data.toString();
      });
      proc.stderr.on("data", (data) => {
        stderr += data.toString();
      });
      proc.on("error", (err) => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        reject(new Error(err.message));
      });
      proc.on("close", (codeExit) => {
        if (finished) return;
        finished = true;
        clearTimeout(timer);
        if (codeExit === 0) {
          resolve(stdout || "(No output)");
        } else {
          reject(new Error(stderr || `Process exited with code ${codeExit}`));
        }
      });

      // Write the code to stdin and close
      proc.stdin.write(code ?? "");
      proc.stdin.end();
    } catch (err) {
      reject(new Error(err.message));
    }
  });
};
