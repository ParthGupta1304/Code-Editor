import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Select from "react-select";

const CodeEditor = () => {
  const [code, setCode] = useState(
    '// Welcome to the Code Editor!\nconsole.log("Hello, World!");'
  );
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);

  // Language options
  const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  // Theme options
  const themeOptions = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "hc-black", label: "High Contrast" },
  ];

  // Handle editor mount
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.updateOptions({
      fontSize: 14,
      wordWrap: "on",
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });
  };

  // Run code function
  const runCode = async () => {
    if (!code.trim()) {
      setOutput("❌ Error: Please enter some code to run.");
      return;
    }

    setIsRunning(true);
    setOutput("⏳ Running...");

    try {
      console.log("Sending request to backend...");

      // Send code to backend API
      const response = await axios.post(
        "http://localhost:3000/api/codes/run",
        {
          language,
          code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000, // 15 second timeout
        }
      );

      console.log("Response received:", response.data);
      setOutput(response.data.output || "(No output)");
    } catch (error) {
      console.error("Error running code:", error);

      let errorMessage = "Unknown error occurred";

      if (
        error.code === "ERR_NETWORK" ||
        error.message.includes("Network Error")
      ) {
        errorMessage =
          "Cannot connect to backend server. Make sure it's running on port 3000.";
      } else if (error.code === "ECONNREFUSED") {
        errorMessage = "Connection refused. Backend server is not running!";
      } else if (error.response) {
        errorMessage = error.response.data?.error || error.response.statusText;
      } else if (error.request) {
        errorMessage = "No response from server. Check if backend is running.";
      } else {
        errorMessage = error.message;
      }

      setOutput(`❌ Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption.value);

    const defaultCode = {
      javascript: '// JavaScript\nconsole.log("Hello, World!");',
      python: '# Python\nprint("Hello, World!")',
    };

    setCode(defaultCode[selectedOption.value] || "// Start coding...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              <Link to="/">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Home</span>
                </button>
              </Link>

              {/* Title */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Code Editor
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="w-40">
                <Select
                  value={languageOptions.find((opt) => opt.value === language)}
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
                  className="text-sm font-semibold"
                />
              </div>

              {/* Theme Selector */}
              <div className="w-40">
                <Select
                  value={themeOptions.find((opt) => opt.value === theme)}
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
                  className="text-sm font-semibold"
                />
              </div>

              {/* Run Button */}
              <button
                onClick={runCode}
                disabled={isRunning}
                className={
                  "px-6 py-2 rounded-lg font-medium transition-all duration-200 text-white " +
                  (isRunning
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-500/50")
                }
              >
                {isRunning ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Running...</span>
                  </span>
                ) : (
                  "▶ Run Code"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main editor area */}
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
          {/* Editor Panel */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden flex-1 border border-gray-700 shadow-2xl">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 text-sm font-medium flex items-center justify-between border-b border-gray-700">
              <span className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                <span>Editor ({language})</span>
              </span>
            </div>
            <div className="h-[calc(100%-48px)]">
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
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden flex-1 border border-gray-700 shadow-2xl">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 text-sm font-medium flex items-center justify-between border-b border-gray-700">
              <span className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Output</span>
              </span>
              <button
                onClick={() => setOutput("")}
                className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="h-[calc(100%-48px)] p-4 overflow-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap text-gray-200">
                {output || (
                  <span className="text-gray-500 italic">
                    Click "▶ Run Code" to see output here...
                  </span>
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
