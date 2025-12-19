"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { openInVSCodeAction } from "@/app/actions/open-actions";

function OpenCategoriesInVSCode() {
  const handleOpenCategoriesInVSCode = async () => {
    try {
      const result = await openInVSCodeAction("settings/categories.json");
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
        onClick={handleOpenCategoriesInVSCode}
      >
        Open Categories List in VS Code
      </Button>
    </div>
  );
}

export default OpenCategoriesInVSCode;
