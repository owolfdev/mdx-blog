"use client";
import type React from "react";
import { useRef, useState } from "react";

interface CodeProps {
  className?: string;
  children: React.ReactNode;
}

const Code = (props: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const className = props.className || "";
  const matches = className.match(/language-(.*)/);
  const language = matches?.[1] || "";

  const handleCopy = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div
      className="gap-0 rounded-lg text-white pb-6 w-full max-w-full overflow-hidden"
      style={{ maxWidth: "100%", overflow: "hidden" }}
    >
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
      <pre
        className="bg-gray-800 p-4 rounded-b-lg overflow-auto w-full block max-w-full"
        style={{
          maxWidth: "100%",
          overflowX: "auto",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <code
          ref={codeRef}
          className={`${className} bg-gray-800 block w-full`}
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {props.children}
        </code>
      </pre>
    </div>
  );
};

export default Code;
