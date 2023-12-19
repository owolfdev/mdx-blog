"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { isDevMode } from "@/lib/utils";

import { FileIcon } from "@radix-ui/react-icons";

function CachePostsButton() {
  const router = useRouter();
  const handleCachePosts = async () => {
    const response = await fetch("/api/cache-posts", { method: "POST" });

    if (!response.ok) {
      console.error("Server responded with an error:", response.status);
      return;
    }

    try {
      const data = await response.json();
      console.log(data); // Or handle this message as needed
      router.refresh();
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <>
      {isDevMode() && (
        <div>
          <Button
            title="Cache posts to update blog roll."
            onClick={handleCachePosts}
          >
            <div className="flex gap-2 items-center">
              {" "}
              <FileIcon /> Cache Posts
            </div>
          </Button>
        </div>
      )}
    </>
  );
}

export default CachePostsButton;
