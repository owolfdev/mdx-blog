"use client";
import React from "react";
import dynamic from "next/dynamic";

type MdxContentProps = {
  slug: string;
  id: string;
};

const MdxContent = ({ slug, id }: MdxContentProps) => {
  const MDXContent = dynamic(() => import(`@/content/posts/${slug}.mdx`), {
    loading: () => <p className="text-lg">Loading content...</p>,
    ssr: false, // Optional: Disable server-side rendering if you want purely client-side loading.
  });

  return (
    <div>
      <MDXContent />
    </div>
  );
};

export default MdxContent;
