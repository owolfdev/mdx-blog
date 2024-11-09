import React from "react";
import type { Metadata } from "next";
import EditPageButton from "@/components/page/edit-page-button";
import OpenInCursor from "@/components/page/open-page-in-cursor-button";
import { isDevMode } from "@/lib/utils/is-dev-mode";
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

// Render the About page using the dynamically imported content
export default async function PrivacyPage() {
  const mdxModule = await loadMdxFile();

  if (!mdxModule) {
    return <p>Page not found</p>; // Handle the case where the MDX file is not found
  }

  const { default: Content, metadata } = mdxModule;

  return (
    <div className="flex flex-col max-w-3xl w-full gap-8 pt-10">
      <h1 className="text-6xl font-black">{metadata.title}</h1>
      {isDevMode() && (
        <div className="flex gap-3">
          <EditPageButton slug={metadata.slug} />
          <OpenInCursor path={metadata.slug} />
        </div>
      )}
      <article className="prose prose-lg mx-auto w-full">
        <Content />
      </article>
    </div>
  );
}
