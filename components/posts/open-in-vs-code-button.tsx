"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { openInVSCodeAction } from "@/app/actions/open-actions";

function OpenInVSCode({ path }: { path: string }) {
  const handleOpenInVSCode = async () => {
    const filePath = `content/posts/${path}.mdx`;
    const response = await openInVSCodeAction(filePath);
    if (response.ok) {
      // router.push("/settings");
    } else {
      console.error("Failed to open in VS Code:", response.error);
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <Button variant="outline" type="button" onClick={handleOpenInVSCode}>
          Edit File In VS Code
        </Button>
      </div>
    </div>
  );
}

export default OpenInVSCode;
