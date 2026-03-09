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

const readLocalPostContent = (slug: string) => {
  const filePath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf-8");
};

export async function getPost({ slug }: GetPostParams) {
  try {
    if (slug === ".DS_Store") {
      return { notFound: true as const };
    }

    const useGithubSource = shouldUseGithubSource();

    let fileContent: string | null = null;
    if (useGithubSource) {
      const repo = getGithubRepo();
      const branch = getGithubBranch();
      const token = process.env.GITHUB_TOKEN ?? "";

      try {
        fileContent = await githubGetFileContent(
          repo,
          branch,
          `content/posts/${slug}.mdx`,
          token
        );
      } catch (error) {
        console.error(
          `GitHub read failed for post "${slug}". Falling back to local content.`,
          error
        );
        fileContent = readLocalPostContent(slug);
      }

      if (!fileContent) {
        fileContent = readLocalPostContent(slug);
      }
    } else {
      fileContent = readLocalPostContent(slug);
    }

    if (!fileContent) {
      return { notFound: true as const };
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
    throw error instanceof Error ? error : new Error("Failed to fetch post");
  }
}
