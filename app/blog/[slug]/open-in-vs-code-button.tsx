"use client";
import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function OpenInVSCode({ path }: { path: string }) {
  const router = useRouter();
  const handleOpenInVSCode = async () => {
    fetch("/api/open-in-vs-code", {
      method: "POST",
      body: JSON.stringify(`data/posts/${path}`),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/settings");
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
