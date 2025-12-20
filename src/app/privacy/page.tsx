import type React from "react";
import type { Metadata } from "next";
import EditPageButton from "@/components/page/edit-page-button";
import OpenInCursor from "@/components/page/open-page-in-cursor-button";
import { isDevMode } from "@/lib/utils/is-dev-mode";

interface MdxModule {
  default: React.ComponentType;
  metadata: {
    title: string;
    description: string;
    slug?: string;
  };
}

// Dynamically import the MDX file to access metadata and content
async function loadMdxFile(): Promise<MdxModule | null> {
  try {
    const mdxModule: MdxModule = await import("@/content/pages/privacy.mdx");
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
      title: "privacy",
      description: "privacy",
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
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            MDXBlog
          </span>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            {metadata.title}
          </h1>
          {metadata.description ? (
            <p className="text-base font-medium text-muted-foreground sm:text-lg">
              {metadata.description}
            </p>
          ) : null}
        </header>
        {isDevMode() && (
          <div className="flex flex-wrap justify-center gap-3">
            <EditPageButton slug={metadata.slug ?? "default-slug"} />
            <OpenInCursor path={metadata.slug ?? "default-path"} />
          </div>
        )}
        <article className="prose prose-lg max-w-none">
          <Content />
        </article>
      </div>
    </section>
  );
}
