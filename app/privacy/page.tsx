import React from "react";
import type { Metadata } from "next";

// Dynamically import the MDX file to access metadata and content
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function loadMdxFile(): Promise<any> {
  try {
    const mdxModule = await import("@/content/pages/privacy.mdx");
    return mdxModule;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}

// Generate metadata using the imported metadata from the MDX file
export async function generateMetadata(): Promise<Metadata> {
  const mdxModule = await loadMdxFile();
  if (!mdxModule) {
    return {
      title: "Page Not Found",
      description: "",
    };
  }
  const { metadata } = mdxModule;

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

// Render the Privacy Policy page using the dynamically imported content
export default async function PrivacyPage() {
  const mdxModule = await loadMdxFile();

  if (!mdxModule) {
    return <p>Page not found</p>; // Handle the case where the MDX file is not found
  }

  const { default: PrivacyContent, metadata } = mdxModule;

  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          Privacy Policy
        </h1>
        <PrivacyContent />
      </div>
    </div>
  );
}
