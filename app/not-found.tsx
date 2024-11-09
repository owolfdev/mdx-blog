import React from "react";
import type { Metadata } from "next";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dynamically import the MDX file to access metadata and content
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function loadMdxFile(): Promise<any> {
  try {
    const mdxModule = await import("@/content/pages/404.mdx");
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
export default async function NotFoundPage() {
  const mdxModule = await loadMdxFile();

  if (!mdxModule) {
    return <p>Page not found</p>; // Handle the case where the MDX file is not found
  }

  const { default: NotFoundContent, metadata } = mdxModule;

  return (
    <div className="flex flex-col max-w-3xl w-full gap-8 pt-10">
      <XCircle className="w-24 h-24 mx-auto text-muted-foreground" />
      <h1 className="text-6xl font-black text-center">404</h1>
      <h2 className="text-4xl font-bold text-center">{metadata.title}</h2>
      {/* Add the prose class here */}
      <article className="prose prose-lg mx-auto w-full text-center">
        <NotFoundContent />
      </article>
      <Button asChild className="max-w-3xl mx-auto">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
