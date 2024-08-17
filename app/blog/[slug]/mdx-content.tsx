"use client";
import React from "react";
import dynamic from "next/dynamic";

type MdxContentProps = {
  slug: string;
};

const MdxContent = ({ slug }: MdxContentProps) => {
  try {
    const MDXContent = dynamic(() => import(`@/content/posts/${slug}.mdx`));
    return <MDXContent />;
  } catch (error) {
    console.error("Failed to load MDX content:", error);
    return <p>Content not found.</p>;
  }
};

export default MdxContent;
