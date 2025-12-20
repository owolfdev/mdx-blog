import type React from "react";
import type { Metadata } from "next";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Dynamically import the MDX file to access metadata and content
async function loadMdxFile() {
  try {
    const mdxModule = await import("@/content/pages/404.mdx");
    return mdxModule as {
      default: React.ComponentType;
      metadata: {
        title: string;
        description: string;
      };
    };
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
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <XCircle className="h-24 w-24 text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          MDXBlog
        </span>
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl">404</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
          {metadata.title}
        </h2>
        <article className="prose prose-lg mx-auto max-w-2xl text-center">
          <NotFoundContent />
        </article>
        <Button
          asChild
          className="h-12 rounded-none bg-foreground px-8 text-sm font-black uppercase tracking-[0.2em] text-background hover:bg-foreground/90"
        >
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </section>
  );
}
