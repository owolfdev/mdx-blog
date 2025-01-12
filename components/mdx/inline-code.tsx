"use client";
import type React from "react";

interface InlineCodeProps {
  children: React.ReactNode;
}

const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code
      className="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 px-2 py-1 rounded text-base"
      style={{
        maxWidth: "100%",
        overflowX: "auto",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {children}
    </code>
  );
};

export default InlineCode;
