"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { openInVSCodeAction } from "@/app/actions/open-actions";

function OpenAuthorsInVSCode() {
  const handleOpenAuthorsInVSCode = async () => {
    try {
      const result = await openInVSCodeAction("data/settings/authors.json");
      if (result.ok) {
        console.log(result.data);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Failed to open file:", error);
    }
  };

  return (
    <div>
      <Button
        title="Open local categories list file in VS code for editing."
        onClick={handleOpenAuthorsInVSCode}
      >
        Open Authors List in VS Code
      </Button>
    </div>
  );
}

export default OpenAuthorsInVSCode;
