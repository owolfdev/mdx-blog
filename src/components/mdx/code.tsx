"use client";
import type React from "react";
import { useRef, useState } from "react";

interface CodeProps {
  className?: string;
  children: React.ReactNode;
}

const Code = ({ className = "", children }: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const matches = className.match(/language-([a-z0-9+-]+)/i);
  const hasMdxLabel = className.includes("language-mdx-label");
  const language = hasMdxLabel ? "mdx" : matches?.[1] || "";

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
    <div className="mb-6 w-full max-w-full overflow-hidden rounded-none border border-border bg-muted/30 dark:bg-muted/20 text-foreground shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <span>{language || "code"}</span>
        <button
          type="button"
          className="rounded-none border border-border bg-background px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className="bg-transparent p-4 text-sm leading-relaxed text-foreground"
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
          className={`${className} block w-full bg-transparent font-mono`}
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {children}
        </code>
      </pre>
    </div>
  );
};

export default Code;
