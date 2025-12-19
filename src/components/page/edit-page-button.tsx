"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function EditPageButton({ slug }: { slug: string }) {
  return (
    <div>
      <Link href={`/page/edit/${slug}`}>
        <Button variant="outline">Edit Page</Button>
      </Link>
    </div>
  );
}

export default EditPageButton;
