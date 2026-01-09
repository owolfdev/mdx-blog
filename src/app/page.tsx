import type React from "react";
import type { Metadata } from "next";
import EditPageButton from "@/components/page/edit-page-button";
import OpenInCursor from "@/components/page/open-page-in-cursor-button";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import { HomeHero } from "@/components/home/hero";
import { HomeFeatures } from "@/components/home/features";
import { HomeUseCases } from "@/components/home/use-cases";
import { HomeForAgencies } from "@/components/home/for-agencies";
import PopularPosts from "@/components/posts/popular-posts";
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
    const mdxModule: MdxModule = await import("@/content/pages/home.mdx");
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
      title: "MDXBlog",
      description: "MDXBlog",
    };
  }
  const { metadata } = mdxModule;

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

// Render the About page using the dynamically imported content
export default async function HomePage() {
  const mdxModule = await loadMdxFile();

  if (!mdxModule) {
    return <p>Page not found</p>; // Handle the case where the MDX file is not found
  }

  const { default: Content, metadata } = mdxModule;

  return (
    <div className="flex w-full flex-col">
      <HomeHero />
      <HomeFeatures />
      <HomeUseCases />
      {/* <HomeForAgencies /> */}
      <section className="site-container py-16 md:py-24">
        <PopularPosts />
      </section>
      {/* <section className="site-container py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {isDevMode() && (
            <div className="flex flex-wrap gap-3">
              <EditPageButton slug={metadata.slug ?? "default-slug"} />
              <OpenInCursor path={metadata.slug ?? "default-path"} />
            </div>
          )}
        </div>
      </section> */}
    </div>
  );
}
