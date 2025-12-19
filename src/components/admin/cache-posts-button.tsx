"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { isDevMode } from "@/lib/utils/is-dev-mode";

import { FileIcon } from "@radix-ui/react-icons";
import { cachePostsAction } from "@/app/actions/cache-actions";

function CachePostsButton() {
  const router = useRouter();

  const handleCachePosts = async () => {
    const response = await cachePostsAction();

    if (!response.ok) {
      console.error("Server responded with an error:", response.status);
      return;
    }

    try {
      const data = response.data;
      console.log(data); // Handle this data as needed
      router.refresh();
    } catch (error) {
      console.error("Error processing data:", error);
    }

    router.push("/blog");
    router.refresh();
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
