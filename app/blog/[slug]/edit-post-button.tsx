"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isDevMode } from "@/lib/utils";

import { useUser } from "@clerk/nextjs";

function EditPostButton({ slug, author }: { slug: string; author: string }) {
  const { user } = useUser();
  return (
    <div>
      {isDevMode() && user && user.fullName === author && (
        <div>
          <Link href={`/blog/edit/${slug}`}>
            <Button>Edit Post</Button>
          </Link>
          {/* <div>{JSON.stringify(isDevMode())}</div> */}
        </div>
      )}
    </div>
  );
}

export default EditPostButton;
