"use client";
import type React from "react";

interface InlineCodeProps {
  children: React.ReactNode;
}

const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code
      className="rounded-none border border-border bg-muted/50 px-2 py-1 text-sm font-semibold text-foreground"
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
