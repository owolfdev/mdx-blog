"use server"; // Indicate this is a server action
import fs from "node:fs";
import path from "node:path";
import {
  getGithubBranch,
  getGithubRepo,
  githubGetFileContent,
  shouldUseGithubSource,
} from "@/lib/posts/mdx-storage";

interface GetPostParams {
  slug: string;
}

export async function getPost({ slug }: GetPostParams) {
  try {
    if (slug === ".DS_Store") {
      throw new Error("Invalid file: .DS_Store");
    }

    const useGithubSource = shouldUseGithubSource();

    let fileContent = "";
    if (useGithubSource) {
      const repo = getGithubRepo();
      const branch = getGithubBranch();
      const token = process.env.GITHUB_TOKEN ?? "";
      const content = await githubGetFileContent(
        repo,
        branch,
        `content/posts/${slug}.mdx`,
        token
      );
      if (!content) {
        return { notFound: true };
      }
      fileContent = content;
    } else {
      const filePath = path.join("content/posts", `${slug}.mdx`);
      fileContent = fs.readFileSync(filePath, "utf-8");
    }

    const metadataMatch = fileContent.match(
      /export const metadata = {([\s\S]+?)};\n\n/
    );
    // biome-ignore lint/security/noGlobalEval: This eval usage is controlled and safe for server use
    const metadata = metadataMatch ? eval(`({${metadataMatch[1]}})`) : {};
    const content = fileContent
      .replace(/export const metadata = {[\s\S]+?};\n\n/, "")
      .trim();

    return {
      metadata,
      slug,
      content,
      filename: `${slug}.mdx`,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
}
