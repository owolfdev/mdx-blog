"use client";
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function BlogLink() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-8 justify-center align-middle items-center">
      <Link href="/blog">
        <Button onClick={() => setLoading(true)} className="w-[200px]">
          Start Reading
        </Button>
      </Link>
      <div>{loading && <Loader className="animate-spin" />}</div>
    </div>
  );
}

export default BlogLink;
