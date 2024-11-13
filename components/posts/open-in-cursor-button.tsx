"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { openInCursorAction } from "@/app/actions/open-actions";

function OpenInCursor({ path }: { path: string }) {
  const handleOpenInCursor = async () => {
    const filePath = `content/posts/${path}.mdx`;
    const response = await openInCursorAction(filePath);
    if (response.ok) {
      // router.push("/settings");
    } else {
      console.error("Failed to open in Cursor:", response.error);
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <Button
          aria-label="Open in Cursor" // Provide an accessible name
          variant="outline"
          type="button"
          onClick={handleOpenInCursor}
        >
          Edit File In Cursor
        </Button>
      </div>
    </div>
  );
}

export default OpenInCursor;
