"use server";

import fs from "node:fs";
import path from "node:path";
import { generatePostsCache } from "@/lib/cache/generate-cache-posts.mjs";
import type { MdxPostMetadata } from "@/types/mdx-post";
import {
  getGithubBranch,
  getGithubRepo,
  githubDeleteFile,
  githubGetFileSha,
  githubUpsertFile,
  ensureMetadataBlock,
  slugify,
} from "@/lib/posts/mdx-storage";

type UpdatePostInput = {
  slug: string;
  nextSlug?: string;
  metadata: MdxPostMetadata;
  content: string;
};

export async function updatePost({
  slug,
  nextSlug,
  metadata,
  content,
}: UpdatePostInput): Promise<{ slug: string }> {
  const normalizedContent = ensureMetadataBlock(content, metadata);
  const slugBase = slugify(nextSlug || slug);
  let finalSlug = slugBase || slug;
  const isRenaming = finalSlug !== slug;
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const projectRoot = process.cwd();
    const postsDir = path.join(projectRoot, "content/posts");
    let filePath = path.join(postsDir, `${finalSlug}.mdx`);
    let counter = 1;
    while (fs.existsSync(filePath) && finalSlug !== slug) {
      finalSlug = `${slugBase}-${counter}`;
      filePath = path.join(postsDir, `${finalSlug}.mdx`);
      counter += 1;
    }
    const originalPath = path.join(postsDir, `${slug}.mdx`);
    if (isRenaming && fs.existsSync(originalPath)) {
      fs.renameSync(originalPath, filePath);
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
  let targetPath = `content/posts/${finalSlug}.mdx`;
  let counter = 1;
  while (
    (await githubGetFileSha(repo, branch, targetPath, token)) &&
    finalSlug !== slug
  ) {
    finalSlug = `${slugBase}-${counter}`;
    targetPath = `content/posts/${finalSlug}.mdx`;
    counter += 1;
  }

  const originalPath = `content/posts/${slug}.mdx`;
  const originalSha = await githubGetFileSha(
    repo,
    branch,
    originalPath,
    token
  );
  if (!originalSha) {
    throw new Error(`Post ${slug} not found in ${repo}.`);
  }

  const targetSha =
    finalSlug === slug
      ? originalSha
      : await githubGetFileSha(repo, branch, targetPath, token);

  await githubUpsertFile(
    repo,
    branch,
    targetPath,
    normalizedContent,
    token,
    `Update post ${finalSlug}`,
    targetSha
  );

  if (finalSlug !== slug) {
    await githubDeleteFile(
      repo,
      branch,
      originalPath,
      token,
      originalSha,
      `Remove post ${slug}`
    );
  }

  return { slug: finalSlug };
}
