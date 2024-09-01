"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function EditPostButton({ slug }: { slug: string }) {
  return (
    <div>
      <Link href={`/blog/edit/${slug}`}>
        <Button variant="outline">Edit Post</Button>
      </Link>
    </div>
  );
}

export default EditPostButton;
