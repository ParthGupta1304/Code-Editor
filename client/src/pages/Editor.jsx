import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Select from "react-select";

const CodeEditor = () => {
  // State management - explaining each piece:
  const [code, setCode] = useState(
    '// Welcome to the Code Editor!\nconsole.log("Hello, World!");'
  );
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);

  // Language options for the dropdown
  const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ];

  // Theme options
  const themeOptions = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "hc-black", label: "High Contrast" },
  ];

  // Handle editor mount - this gives us access to the editor instance
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure editor options for better experience
    editor.updateOptions({
      fontSize: 14,
      wordWrap: "on",
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });
  };

  // Run code function - this will send code to backend for execution
  const runCode = async () => {
    if (!code.trim()) {
      setOutput("Error: Please enter some code to run.");
      return;
    }

    setIsRunning(true);
    setOutput("Running...");

    try {
      // For now, we'll simulate code execution
      // Later we'll connect this to a real backend API
      setTimeout(() => {
        if (language === "javascript") {
          setOutput(
            "// Simulated output:\n// Code executed successfully!\n// (Backend integration coming next)"
          );
        } else {
          setOutput(
            `// Simulated output for ${language}:\n// Code executed successfully!\n// (Backend integration coming next)`
          );
        }
        setIsRunning(false);
      }, 2000);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setIsRunning(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption.value);

    // Set default code for each language
    const defaultCode = {
      javascript: '// JavaScript\nconsole.log("Hello, World!");',
      python: '# Python\nprint("Hello, World!")',
      java: '// Java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      cpp: '// C++\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      // c: '// C\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      // html: "<!-- HTML -->\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>",
      // css: "/* CSS */\nbody {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n    color: #333;\n}\n\nh1 {\n    color: #007bff;\n}",
    };

    setCode(defaultCode[selectedOption.value] || "// Start coding...");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header with controls */}
      <div className="bg-zinc-950 p-4 ">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Code Editor</h1>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="w-40">
              <Select
                value={languageOptions.find(
                  (option) => option.value === language
                )}
                onChange={handleLanguageChange}
                options={languageOptions}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3b82f6",
                    primary25: "#1f2937",
                    neutral0: "#374151",
                    neutral80: "#ffffff",
                  },
                })}
                className="text-lg font-semibold"
              />
            </div>

            {/* Theme Selector */}
            <div className="w-40">
              <Select
                value={themeOptions.find((option) => option.value === theme)}
                onChange={(option) => setTheme(option.value)}
                options={themeOptions}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#3b82f6",
                    primary25: "#1f2937",
                    neutral0: "#374151",
                    neutral80: "#ffffff",
                  },
                })}
                className="text-lg font-semibold"
              />
            </div>

            {/* Run Button */}
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isRunning
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {isRunning ? "Running..." : "Run Code"}
            </button>
          </div>
        </div>
      </div>

      {/* Main editor area */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-200px)]">
          {/* Editor Panel */}
          <div className="bg-gray-800 rounded-lg overflow-hidden flex-1">
            <div className="bg-gray-700 px-4 py-2 text-sm font-medium">
              Editor ({language})
            </div>
            <div className="h-[calc(100%-40px)]">
              <Editor
                height="100%"
                language={language}
                theme={theme}
                value={code}
                onChange={(value) => setCode(value || "")}
                onMount={handleEditorDidMount}
                options={{
                  fontSize: 14,
                  wordWrap: "on",
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-gray-800 rounded-lg overflow-hidden flex-1">
            <div className="bg-gray-700 px-4 py-2 text-sm font-medium flex items-center justify-between">
              <span>Output</span>
              <button
                onClick={() => setOutput("")}
                className="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded"
              >
                Clear
              </button>
            </div>
            <div className="h-[calc(100%-40px)] p-4 overflow-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {output || 'Click "Run Code" to see output here...'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
