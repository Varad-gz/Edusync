'use client'

import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { autocompletion } from "@codemirror/autocomplete";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import GoBackButton from "@/components/GoBackButton";
import { GoHomeFill } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import DOMPurify from "dompurify";

// Pyodide runtime for Python
let pyodide = null;

const Editor = () => {
    const [code, setCode] = useState("console.log('Hello World')");
    const [language, setLanguage] = useState("javascript");
    const [htmlContent, setHtmlContent] = useState('');
    const [loadingPython, setLoadingPython] = useState(true);

    // Load Pyodide from CDN
    useEffect(() => {
        const loadPyodide = async () => {
            try {
                // Check if pyodide is already loaded
                if (window.loadPyodide && !pyodide) {
                    pyodide = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
                    });

                    // Redirect Python's stdout to capture print statements
                    pyodide.runPython(`
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.output = []
    
    def write(self, text):
        if text.strip():
            self.output.append(text)
    
    def flush(self):
        pass
    
    def get_output(self):
        return ''.join(self.output)

_output_capture = OutputCapture()
sys.stdout = _output_capture
                    `);

                    setLoadingPython(false);
                }
            } catch (error) {
                console.error('Error loading Pyodide:', error);
                setLoadingPython(false);
            }
        };

        // Check if script is already loaded
        const existingScript = document.querySelector('script[src*="pyodide.js"]');

        if (!existingScript) {
            // Inject Pyodide script dynamically
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
            script.onload = loadPyodide;
            script.onerror = () => {
                console.error('Failed to load Pyodide script');
                setHtmlContent('Failed to load Python runtime');
                setLoadingPython(false);
            };
            document.head.appendChild(script);
        } else if (window.loadPyodide && !pyodide) {
            // Script exists but pyodide not initialized
            loadPyodide();
        } else if (pyodide) {
            // Pyodide already loaded
            setLoadingPython(false);
        }

        // Cleanup function - don't remove script as it might be needed for other components
        return () => {
            // Don't remove the script as it might be shared
        };
    }, []);

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const handleLanguageChange = (event) => {
        const lang = event.target.value;
        setLanguage(lang);
        setCode(lang === 'javascript' ? "console.log('Hello World');" : "print('Hello World')");
    };

    const getExtensions = () => {
        switch (language) {
            case "javascript":
                return [javascript(), autocompletion()];
            case "python":
                return [python(), autocompletion()];
            default:
                return [javascript(), autocompletion()];
        }
    };

    const handleRun = async () => {
        if (language === 'javascript') {
            try {
                let output = '';
                const originalLog = console.log;
                const originalError = console.error;

                console.log = (...args) => {
                    output += args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ') + '\n';
                };
                console.error = (...args) => {
                    output += 'Error: ' + args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ') + '\n';
                };

                try {
                    const result = eval(code);
                    if (result !== undefined && !output.trim()) {
                        output = String(result);
                    }
                } catch (err) {
                    output = `Error: ${err.message}`;
                } finally {
                    console.log = originalLog;
                    console.error = originalError;
                }

                setHtmlContent(DOMPurify.sanitize(
                    `<span class='text-gray-400'>Output></span><br/><pre>${output || '(no output)'}</pre>`
                ));
            } catch (err) {
                setHtmlContent(DOMPurify.sanitize(
                    `<span class='text-red-500'>Error></span><br/><pre>${err.message}</pre>`
                ));
            }
        } else if (language === 'python') {
            if (loadingPython || !pyodide) {
                setHtmlContent('Python still loading or not available...');
                return;
            }

            try {
                // Clear previous output
                pyodide.runPython('_output_capture.output.clear()');

                // Run the user code
                const result = pyodide.runPython(code);

                // Get captured output
                const capturedOutput = pyodide.runPython('_output_capture.get_output()');

                let output = '';
                if (capturedOutput) {
                    output = capturedOutput;
                } else if (result !== undefined && result !== null) {
                    output = String(result);
                } else {
                    output = '(no output)';
                }

                setHtmlContent(DOMPurify.sanitize(
                    `<span class='text-gray-400'>Output></span><br/><pre>${output}</pre>`
                ));
            } catch (err) {
                setHtmlContent(DOMPurify.sanitize(
                    `<span class='text-red-500'>Error></span><br/><pre>${err.message || err}</pre>`
                ));
            }
        }
    };

    return (
        <div className="flex flex-col">
            <div className="h-[50px] bg-black text-white flex flex-row items-center justify-between px-[20px]">
                <div className="flex flex-row items-center">
                    <GoBackButton logoColor='white' btnHoverLogoColor='hover:text-gray-400' removeText />
                    <Link href="/">
                        <div className="ml-[20px] text-[30px] hover:text-gray-400"><GoHomeFill /></div>
                    </Link>
                    <button
                        className={`ml-[20px] text-[25px] ${loadingPython && language === 'python' ? 'text-gray-600 cursor-not-allowed' : 'hover:text-gray-400'}`}
                        onClick={handleRun}
                        disabled={loadingPython && language === 'python'}
                    >
                        <FaPlay />
                    </button>
                </div>
                <div>
                    <select onChange={handleLanguageChange} value={language} className="bg-black outline-none">
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                </div>
            </div>
            <div className="h-[calc(100vh-50px)] flex flex-row">
                <CodeMirror
                    value={code}
                    onChange={handleEditorChange}
                    extensions={getExtensions()}
                    theme={vscodeDark}
                    className="w-1/2 border-none h-full outline-none"
                />
                <div className="w-[5px] h-full bg-zinc-900"></div>
                <div className="w-1/2 bg-[#1E1E1E] text-white px-[30px] py-[10px] overflow-auto">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
            </div>
        </div>
    );
};

export default Editor;