import { executeCode } from "../utils/execute.js";

// Test JavaScript code
executeCode("javascript", 'console.log("Hello from JS!")')
  .then((output) => console.log("JS Output:", output))
  .catch((error) => console.error("JS Error:", error));

// Test Python code
executeCode("python", 'print("Hello from Python!")')
  .then((output) => console.log("Python Output:", output))
  .catch((error) => console.error("Python Error:", error));
