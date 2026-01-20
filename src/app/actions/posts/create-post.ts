"use server";

import fs from "node:fs";
import path from "node:path";
import { generatePostsCache } from "@/lib/cache/generate-cache-posts.mjs";
import type { MdxPostMetadata } from "@/types/mdx-post";
import {
  getGithubBranch,
  getGithubRepo,
  githubGetFileSha,
  githubUpsertFile,
  ensureMetadataBlock,
  slugify,
} from "@/lib/posts/mdx-storage";

type CreatePostInput = {
  metadata: MdxPostMetadata;
  content: string;
  slug?: string;
};

export async function createPost({
  metadata,
  content,
  slug,
}: CreatePostInput): Promise<{ slug: string }> {
  const normalizedContent = ensureMetadataBlock(content, metadata);
  const slugBase = slugify(slug || metadata.title || "untitled-post");
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const projectRoot = process.cwd();
    const postsDir = path.join(projectRoot, "content/posts");

    let finalSlug = slugBase;
    let filePath = path.join(postsDir, `${finalSlug}.mdx`);
    let counter = 1;
    while (fs.existsSync(filePath)) {
      finalSlug = `${slugBase}-${counter}`;
      filePath = path.join(postsDir, `${finalSlug}.mdx`);
      counter += 1;
    }

    fs.writeFileSync(filePath, normalizedContent);
    await generatePostsCache();
    return { slug: finalSlug };
  }

  const token = process.env.GITHUB_TOKEN ?? "";
  if (!token) {
    throw new Error("GITHUB_TOKEN is missing.");
  }

  const repo = getGithubRepo();
  const branch = getGithubBranch();
  let finalSlug = slugBase;
  let filePath = `content/posts/${finalSlug}.mdx`;
  let counter = 1;
  while (await githubGetFileSha(repo, branch, filePath, token)) {
    finalSlug = `${slugBase}-${counter}`;
    filePath = `content/posts/${finalSlug}.mdx`;
    counter += 1;
  }

  await githubUpsertFile(
    repo,
    branch,
    filePath,
    normalizedContent,
    token,
    `Add post ${finalSlug}`
  );

  return { slug: finalSlug };
}
