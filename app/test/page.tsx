import React from "react";
import type { Metadata } from "next";
import AboutContent, { metadata } from "@/content/pages/about.mdx";

// This function generates metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          About <span className="primary-color">MDX</span>Blog
        </h1>
        <AboutContent />
      </div>
    </div>
  );
}
