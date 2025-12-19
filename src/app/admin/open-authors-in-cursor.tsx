"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { openInCursorAction } from "@/app/actions/open-actions"; // Ensure this function is defined

function OpenAuthorsInCursor() {
  const handleOpenAuthorsInCursor = async () => {
    try {
      const result = await openInCursorAction("settings/authors.json");
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
        title="Open local authors list file in Cursor for editing."
        onClick={handleOpenAuthorsInCursor}
      >
        Open Authors List in Cursor
      </Button>
    </div>
  );
}

export default OpenAuthorsInCursor;
