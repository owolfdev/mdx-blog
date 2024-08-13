"use client";
import React from "react";
import dynamic from "next/dynamic";

type MdxContentProps = {
  slug: string;
};

const MdxContent = ({ slug }: MdxContentProps) => {
  const MDXContent = dynamic(() => import(`@/content/posts/${slug}.mdx`));

  return <MDXContent />;
};

export default MdxContent;
