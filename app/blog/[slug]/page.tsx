import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "node:path";
import fs from "node:fs";
import RelatedPostsList from "./related-posts";
import LikeButton from "@/components/like/like-button";
import EditPostButton from "./edit-post-button";
import OpenInVSCode from "./open-in-vs-code-button";
import { isDevMode } from "@/lib/utils/is-dev-mode";

type Props = {
  params: { slug: string };
};

// Dynamically import the MDX file based on the slug
async function loadMdxFile(slug: string) {
  try {
    const mdxPath = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      return null;
    }
    const mdxModule = await import(`@/content/posts/${slug}.mdx`);
    return mdxModule;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}

// Generate metadata using the imported metadata from the MDX file
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mdxModule = await loadMdxFile(params.slug);
  if (!mdxModule) {
    return {
      title: "Post Not Found",
      description: "",
    };
  }
  const { metadata } = mdxModule;

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Blog({ params }: Props) {
  const { slug } = params;
  const mdxModule = await loadMdxFile(slug);

  if (!mdxModule) {
    notFound(); // Return a 404 page if the MDX file is not found
  }

  const { default: Content, metadata } = mdxModule;

  // Extract the dates and compare them
  const publishDate = new Date(metadata?.publishDate);
  const modifiedDate = new Date(metadata?.modifiedDate);

  // Choose the date to display
  const displayDate =
    modifiedDate > publishDate ? metadata?.modifiedDate : metadata?.publishDate;

  // Format the original published date
  const originallyPublishedDateFormatted = publishDate.toLocaleDateString(
    "en-US",
    {
      year: "numeric", // "2024"
      month: "short", // "Aug"
      day: "numeric", // "31"
    }
  );

  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <article className="prose prose-lg md:prose-lg lg:prose-lg mx-auto min-w-full">
          <div className="pb-6">
            <p className="font-semibold text-lg">
              <span
                className="text-primary pr-1"
                title={`Date last modified. Originally published on ${originallyPublishedDateFormatted}`}
              >
                {displayDate.split("T")[0]}
              </span>{" "}
              {metadata?.categories?.map((category: string, index: number) => (
                <span key={index + category} title="Post category">
                  {category}
                  {index < metadata?.categories.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
          <div className="pb-6">
            <h1 className="text-4xl sm:text-6xl font-black capitalize leading-12">
              {metadata?.title}
            </h1>
            <p className="pt-6 text-xl sm:text-lg">By {metadata?.author}</p>
          </div>
          {/* Render the dynamically loaded MDX content */}
          {isDevMode() && (
            <div className="flex gap-2 mb-4">
              <EditPostButton slug={slug} />
              <OpenInVSCode path={slug} />
            </div>
          )}
          <Content />
        </article>
      </div>
      <div>
        <div>
          <RelatedPostsList relatedSlugs={metadata?.relatedPosts} />
        </div>
      </div>
      <LikeButton postId={metadata?.id} />
    </div>
  );
}

// Generate static paths for all slugs based on MDX files in the posts directory
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("content", "posts"));
  const params = files
    .filter((filename) => filename.endsWith(".mdx")) // Only process MDX files
    .map((filename) => ({
      slug: filename.replace(".mdx", ""),
    }));

  return params;
}
