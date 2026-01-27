"use server";

import fs from "node:fs";
import path from "node:path";
import { generatePostsCache } from "@/lib/cache/generate-cache-posts.mjs";
import {
  getGithubBranch,
  getGithubRepo,
  githubDeleteFile,
  githubGetFileSha,
  shouldUseGithubSource,
} from "@/lib/posts/mdx-storage";
import { requireAdminUser } from "@/lib/utils/require-admin";

type DeletePostInput = {
  slug: string;
};

export async function deletePost({ slug }: DeletePostInput) {
  await requireAdminUser();
  const useGithubSource = shouldUseGithubSource();

  if (!useGithubSource) {
    const projectRoot = process.cwd();
    const postsDir = path.join(projectRoot, "content/posts");
    const filePath = path.join(postsDir, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Post ${slug} not found.`);
    }

    fs.unlinkSync(filePath);
    await generatePostsCache();
    return { slug };
  }

  const token = process.env.GITHUB_TOKEN ?? "";
  if (!token) {
    throw new Error("GITHUB_TOKEN is missing.");
  }

  const repo = getGithubRepo();
  const branch = getGithubBranch();
  const filePath = `content/posts/${slug}.mdx`;
  const sha = await githubGetFileSha(repo, branch, filePath, token);
  if (!sha) {
    throw new Error(`Post ${slug} not found in ${repo}.`);
  }

  await githubDeleteFile(repo, branch, filePath, token, sha, `Remove post ${slug}`);

  if (process.env.NODE_ENV !== "production") {
    await generatePostsCache({
      source: "github",
      repo,
      branch,
      token,
    });
  }

  return { slug };
}
