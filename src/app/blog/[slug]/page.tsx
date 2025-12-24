//app/blog/[slug]/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "node:path";
import fs from "node:fs";

import RelatedPostsList from "@/components/posts/related-posts";
import LikeButton from "@/components/like/like-button";
import EditPostButton from "@/components/posts/edit-post-button";
import OpenInCursor from "@/components/posts/open-in-cursor-button";
import { isDevMode } from "@/lib/utils/is-dev-mode";

import CommentSection from "@/components/comments/comment-section";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

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

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const files = fs.readdirSync(postsDir);

  return files
    .filter((fileName) => fileName.endsWith(".mdx") && !fileName.startsWith("."))
    .map((fileName) => ({
      slug: fileName.replace(/\.mdx$/, ""),
    }));
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

  const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:34512";

  const { metadata } = mdxModule;

  const openGraphData = {
    title: metadata.title,
    description: metadata.description,
    url: `${defaultUrl}/blog/${slug}`,
    images: metadata.image,
    siteName: "MDXBlog",
    locale: "en_US",
    type: "website",
  };

  return {
    title: metadata.title,
    description: metadata.description,
    authors: {
      name: metadata.author,
    },
    keywords: metadata.tags,
    openGraph: openGraphData,
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
    <main className="flex w-full flex-col" aria-label="Main content">
      <section className="border-b border-border bg-muted/20">
        <div className="site-container py-16 md:py-20">
          <header
            className="mx-auto flex max-w-3xl flex-col gap-6 text-center"
            aria-label="Post metadata"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              MDXBlog
            </span>
            <h1
              id="post-title"
              className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
            >
              {metadata?.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
              <time
                className="text-primary"
                title={`Date last modified. Originally published on ${originallyPublishedDateFormatted}`}
                dateTime={displayDate}
              >
                {displayDate.split("T")[0]}
              </time>
              <span>·</span>
              <span>By {metadata?.author}</span>
              {metadata?.categories?.length ? <span>·</span> : null}
              <span role="list">
                {metadata?.categories?.map(
                  (category: string, index: number) => (
                    <span
                      key={index + category}
                      role="listitem"
                      title="Post category"
                    >
                      {category}
                      {index < metadata?.categories.length - 1 && ", "}
                    </span>
                  )
                )}
              </span>
            </div>
            {metadata?.description ? (
              <p className="text-base font-regular text-foreground/80 sm:text-lg">
                {metadata.description}
              </p>
            ) : null}
          </header>
        </div>
      </section>

      <section className="site-container py-16 md:py-20">
        {isDevMode() && (
          <div
            className="flex flex-wrap justify-center gap-2 pb-6"
            aria-label="Developer controls"
          >
            <EditPostButton slug={slug} />
            <OpenInCursor path={slug} />
          </div>
        )}
        <article
          className="prose prose-lg mx-auto w-full max-w-4xl"
          aria-labelledby="post-title"
        >
          <section aria-label="Post content">
            <Content />
          </section>
        </article>
      </section>

      <section className="border-t border-border bg-muted/10">
        <div className="site-container py-12">
          <aside aria-label="Related posts">
            <RelatedPostsList relatedSlugs={metadata?.relatedPosts} />
          </aside>
        </div>
      </section>

      <section className="site-container pb-10" aria-label="Post reactions">
        <LikeButton postId={metadata?.id} />
      </section>

      <section className="border-t border-border bg-muted/10">
        <div className="site-container py-12" aria-label="Comments">
          <CommentSection postSlug={slug} initialComments={[]} />
        </div>
      </section>
    </main>
  );
}
