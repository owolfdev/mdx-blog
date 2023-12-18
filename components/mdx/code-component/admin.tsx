"use client";
import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
function AdminBar({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-800 h-[40px] relative top-3 rounded-t-lg flex justify-between items-center px-4">
      <span className="text-white text-sm">{language}</span>
      <button
        onClick={copyToClipboard}
        className="text-white text-sm bg-slate-700 px-2 py-1 rounded-md active:bg-slate-600 h-6 flex items-center"
      >
        {copied ? (
          <div className="flex gap-2 items-center">
            <CheckIcon />
            Code Copied!
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <CopyIcon />
            Copy
          </div>
        )}
      </button>
    </div>
  );
}

export default AdminBar;
