import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function BlogButton() {
  return (
    <Link href="/blog">
      <Button variant="ghost" size="sm">
        {/* <span>
          <ArrowLeft size="1.5em" />
        </span>{" "} */}
        /Blog
      </Button>
    </Link>
  );
}

export default BlogButton;
