"use client";
import React from "react";
import dynamic from "next/dynamic";

type MdxContentProps = {
  slug: string;
};

const MdxContent = ({ slug }: MdxContentProps) => {
  const MDXContent = dynamic(() => import(`@/content/posts/${slug}.mdx`), {
    loading: () => <p>Loading content...</p>,
    ssr: false, // Optional: Disable server-side rendering if you want purely client-side loading.
  });

  return <MDXContent />;
};

export default MdxContent;
