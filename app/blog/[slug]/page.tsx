import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "node:path";
import fs from "node:fs";
//
import RelatedPostsList from "@/components/posts/related-posts";
import LikeButton from "@/components/like/like-button";
import EditPostButton from "@/components/posts/edit-post-button";
import OpenInCursor from "@/components/posts/open-in-cursor-button";
import { isDevMode } from "@/lib/utils/is-dev-mode";

type Props = {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params || !(await params).slug) {
    throw new Error("Params are missing or slug is undefined");
  }

  const { slug } = await params;
  const mdxModule = await loadMdxFile(slug);
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
  if (!params || !(await params).slug) {
    notFound();
  }

  const { slug } = await params;
  const mdxModule = await loadMdxFile(slug);

  if (!mdxModule) {
    notFound();
  }

  const { default: Content, metadata } = mdxModule;
  const publishDate = new Date(metadata?.publishDate);
  const modifiedDate = new Date(metadata?.modifiedDate);
  const displayDate =
    modifiedDate > publishDate ? metadata?.modifiedDate : metadata?.publishDate;
  const originallyPublishedDateFormatted = publishDate.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="flex flex-col max-w-3xl w-full gap-0 pt-10">
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
        {isDevMode() && (
          <div className="flex gap-2 mb-4">
            <EditPostButton slug={slug} />
            <OpenInCursor path={slug} />
          </div>
        )}
        <Content />
      </article>
      <div>
        <div>
          <RelatedPostsList relatedSlugs={metadata?.relatedPosts} />
        </div>
      </div>
      <LikeButton postId={metadata?.id} />
    </div>
  );
}
