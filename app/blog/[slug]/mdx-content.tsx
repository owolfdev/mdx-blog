"use client";

import React from "react";
import { useRouter } from "next/navigation";

type MdxContentProps = {
  slug: string;
};

const MdxContent = ({ slug }: MdxContentProps) => {
  const router = useRouter();

  try {
    const MDXContent = require(`@/content/posts/${slug}.mdx`).default;

    return (
      <div>
        <MDXContent />
      </div>
    );
  } catch (error) {
    console.error("Failed to load MDX content:", error);
    router.replace("/404");
    return <p>Content not found.</p>;
  }
};

export default MdxContent;
