"use client";
import React, { useRef, useState } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Code = (props: any) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  // Extract the language from the className
  const className = props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang || "";

  // Handle copy functionality
  const handleCopy = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  return (
    <div className="code-block gap-0 rounded-lg text-white pb-6">
      <div className="flex justify-between items-center bg-gray-900 py-2 px-4 rounded-t-lg">
        <span className="text-gray-300">{language}</span>
        <button
          type="button"
          className="text-gray-300 hover:text-white"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-gray-800 p-4 rounded-b-lg overflow-auto">
        <code
          ref={codeRef}
          className={`${className} bg-gray-800`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {props.children}
        </code>
      </pre>
    </div>
  );
};

export default Code;
