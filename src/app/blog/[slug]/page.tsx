//app/blog/[slug]/page.tsx
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "node:path";
import fs from "node:fs";
import { evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";

import RelatedPostsList from "@/components/posts/related-posts";
import LikeButton from "@/components/like/like-button";
import EditPostButton from "@/components/posts/edit-post-button";
import OpenInCursor from "@/components/posts/open-in-cursor-button";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import { getPost } from "@/app/actions/posts/get-post";
import { useMDXComponents } from "@/mdx-components";
import { shouldUseGithubSource } from "@/lib/posts/mdx-storage";

import CommentSection from "@/components/comments/comment-section";

type Props = {
  params: Promise<{ slug: string }>;
};

const useGithubSource = shouldUseGithubSource();
export const dynamic = "force-dynamic";
export const dynamicParams = true;

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
  if (useGithubSource) {
    return [];
  }
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
  let metadata: Record<string, string | string[] | null> | null = null;

  if (useGithubSource) {
    const postData = await getPost({ slug });
    if ("notFound" in postData && postData.notFound) {
      return {
        title: "Post Not Found",
        description: "",
      };
    }
    metadata = postData.metadata;
  } else {
    const mdxModule = await loadMdxFile(slug);
    if (!mdxModule) {
      return {
        title: "Post Not Found",
        description: "",
      };
    }
    metadata = mdxModule.metadata;
  }

  const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:34512";

  const openGraphData = {
    title: metadata?.title as string,
    description: metadata?.description as string,
    url: `${defaultUrl}/blog/${slug}`,
    images: metadata?.image as string,
    siteName: "MDXBlog",
    locale: "en_US",
    type: "website",
  };

  return {
    title: metadata?.title as string,
    description: metadata?.description as string,
    authors: {
      name: metadata?.author as string,
    },
    keywords: metadata?.tags as string[],
    openGraph: openGraphData,
  };
}

export default async function Blog({ params }: Props) {
  if (!params || !(await params).slug) {
    notFound();
  }

  const { slug } = await params;
  let metadata: Record<string, string | string[] | null> | null = null;
  let Content: React.ComponentType<{ components?: Record<string, unknown> }> | null =
    null;

  if (useGithubSource) {
    const postData = await getPost({ slug });
    if ("notFound" in postData && postData.notFound) {
      notFound();
    }
    metadata = postData.metadata;
    const { default: MDXContent } = await evaluate(postData.content ?? "", {
      ...runtime,
      Fragment: React.Fragment,
      remarkPlugins: [remarkGfm],
    });
    Content = MDXContent as React.ComponentType<{
      components?: Record<string, unknown>;
    }>;
  } else {
    const mdxModule = await loadMdxFile(slug);
    if (!mdxModule) {
      notFound();
    }
    metadata = mdxModule.metadata;
    Content = mdxModule.default;
  }

  const categories = Array.isArray(metadata?.categories)
    ? (metadata?.categories as string[])
    : [];
  const publishDate = new Date(metadata?.publishDate as string);
  const modifiedDate = new Date(metadata?.modifiedDate as string);
  const displayDate =
    modifiedDate > publishDate
      ? (metadata?.modifiedDate as string)
      : (metadata?.publishDate as string);
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
              {metadata?.title as string}
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
              <span>By {metadata?.author as string}</span>
              {categories.length ? <span>·</span> : null}
              <span role="list">
                {categories.map(
                  (category: string, index: number) => (
                    <span
                      key={index + category}
                      role="listitem"
                      title="Post category"
                    >
                      {category}
                      {index < categories.length - 1 && ", "}
                    </span>
                  )
                )}
              </span>
            </div>
            {metadata?.description ? (
              <p className="text-base font-regular text-foreground/80 sm:text-lg">
                {metadata.description as string}
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
            {Content ? (
              <Content components={useMDXComponents({})} />
            ) : (
              <p>Content not found.</p>
            )}
          </section>
        </article>
      </section>

      <section className="border-t border-border bg-muted/10">
        <div className="site-container py-12">
          <aside aria-label="Related posts">
            <RelatedPostsList
              relatedSlugs={(metadata?.relatedPosts as string[]) ?? []}
            />
          </aside>
        </div>
      </section>

      <section className="site-container pb-10" aria-label="Post reactions">
        <LikeButton postId={metadata?.id as string} />
      </section>

      <section className="border-t border-border bg-muted/10">
        <div className="site-container py-12" aria-label="Comments">
          <CommentSection postSlug={slug} initialComments={[]} />
        </div>
      </section>
    </main>
  );
}
