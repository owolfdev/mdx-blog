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
import { createClient } from "@/utils/supabase/server";

import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

interface DbComment {
  id: string;
  post_slug: string;
  author_name: string | null;
  content: string;
  replied_to_id: string | null;
  created_at: string;
  updated_at: string | null;
  is_approved: boolean;
}

interface Comment {
  id: string;
  postSlug: string;
  authorName: string | null;
  content: string;
  repliedToId: string | null;
  createdAt: string;
  updatedAt: string | null;
  approved: boolean;
}

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

  const supabase = await createClient();

  let commentsData: Comment[] = [];

  try {
    const { data, error } = await supabase
      .from("mdxblog_comments")
      .select("*")
      .eq("post_slug", slug)
      .order("created_at", { ascending: true });

    if (data && !error) {
      const dbComments = data as DbComment[];
      commentsData = dbComments.map((c) => ({
        id: c.id,
        postSlug: c.post_slug,
        authorName: c.author_name,
        content: c.content,
        repliedToId: c.replied_to_id,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
        approved: c.is_approved,
      }));
    } else {
      console.error("Failed to load comments:", error?.message);
    }
  } catch (err) {
    console.error("Error loading comments:", err);
  }

  return (
    <main
      className="flex flex-col max-w-3xl w-full gap-0 pt-10"
      aria-label="Main content"
    >
      <article
        className="prose prose-lg md:prose-lg lg:prose-lg mx-auto min-w-full"
        aria-labelledby="post-title"
      >
        <header aria-label="Post metadata">
          <div className="pb-6">
            <p className="font-semibold text-lg">
              <time
                className="text-primary pr-1"
                title={`Date last modified. Originally published on ${originallyPublishedDateFormatted}`}
                dateTime={displayDate}
              >
                {displayDate.split("T")[0]}
              </time>{" "}
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
            </p>
          </div>
          <div className="pb-6">
            <h1
              id="post-title"
              className="text-4xl sm:text-6xl font-black capitalize leading-12"
            >
              {metadata?.title}
            </h1>
            <p className="pt-6 text-xl sm:text-lg">By {metadata?.author}</p>
          </div>
        </header>

        {isDevMode() && (
          <div className="flex gap-2 mb-4" aria-label="Developer controls">
            <EditPostButton slug={slug} />
            <OpenInCursor path={slug} />
          </div>
        )}

        <section aria-label="Post content">
          <Content />
        </section>
      </article>

      <aside aria-label="Related posts">
        <RelatedPostsList relatedSlugs={metadata?.relatedPosts} />
      </aside>

      <section aria-label="Post reactions">
        <LikeButton postId={metadata?.id} />
      </section>

      <section aria-label="Comments">
        <CommentSection postSlug={slug} initialComments={commentsData} />
      </section>
    </main>
  );
}
