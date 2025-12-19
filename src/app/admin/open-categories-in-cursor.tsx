"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { openInCursorAction } from "@/app/actions/open-actions"; // Ensure this action is correctly implemented

function OpenCategoriesInCursor() {
  const handleOpenCategoriesInCursor = async () => {
    try {
      const result = await openInCursorAction("settings/categories.json");
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
        title="Open local categories list file in Cursor for editing."
        onClick={handleOpenCategoriesInCursor}
      >
        Open Categories List in Cursor
      </Button>
    </div>
  );
}

export default OpenCategoriesInCursor;
