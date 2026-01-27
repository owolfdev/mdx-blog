import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { config } from "../config/config.js"; // Ensure this file is compatible with ES modules
import { parseISO, startOfDay } from "date-fns";

const GITHUB_API_BASE = "https://api.github.com";

// Load environment variables from .env.local file
dotenv.config({ path: ".env.local" });

// Use the service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function extractMetadata(fileContents) {
  const metadataMatch = fileContents.match(
    /export const metadata = ({[\s\S]*?});/
  );
  if (metadataMatch) {
    try {
      // Parse metadata safely using `eval`
      // biome-ignore lint/security/noGlobalEval: <explanation>
      const metadata = eval(`(${metadataMatch[1]})`);
      return metadata;
    } catch (error) {
      console.error("Error parsing metadata:", error);
      return null;
    }
  }
  return null;
}

async function githubRequest(url, token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });
  if (response.status === 404) {
    return { status: 404, data: null };
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message ?? "GitHub request failed.");
  }
  return { status: response.status, data };
}

async function githubListDirectory({ repo, branch, dirPath, token }) {
  const url = `${GITHUB_API_BASE}/repos/${repo}/contents/${dirPath}?ref=${branch}`;
  const result = await githubRequest(url, token);
  if (result.status === 404) {
    return [];
  }
  return Array.isArray(result.data) ? result.data : [];
}

async function githubGetFileContent({ repo, branch, filePath, token }) {
  const url = `${GITHUB_API_BASE}/repos/${repo}/contents/${filePath}?ref=${branch}`;
  const result = await githubRequest(url, token);
  if (result.status === 404) {
    return null;
  }
  const encoded = result.data?.content;
  if (!encoded) {
    return null;
  }
  return Buffer.from(encoded, "base64").toString("utf8");
}

async function fetchLikesCount(postId) {
  const tableName = config.likesTable;
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error(`Error fetching likes for postId ${postId}:`, error);
    return 0;
  }

  return count || 0;
}

export async function generatePostsCache(options = {}) {
  console.log("Generating posts cache...");
  const source = options.source ?? "fs";
  const postsDirectory = path.join(process.cwd(), "content/posts");

  let fileNames = [];
  let fileContentsMap = new Map();

  if (source === "github") {
    const repo = options.repo ?? process.env.GITHUB_REPO ?? "owolfdev/mdx-blog";
    const branch = options.branch ?? process.env.GITHUB_BRANCH ?? "main";
    const token = options.token ?? process.env.GITHUB_TOKEN ?? "";

    const entries = await githubListDirectory({
      repo,
      branch,
      dirPath: "content/posts",
      token,
    });

    fileNames = entries
      .filter(
        (entry) =>
          entry.type === "file" &&
          entry.name.endsWith(".mdx") &&
          !entry.name.startsWith(".")
      )
      .map((entry) => entry.name);

    await Promise.all(
      fileNames.map(async (fileName) => {
        const content = await githubGetFileContent({
          repo,
          branch,
          filePath: `content/posts/${fileName}`,
          token,
        });
        if (content) {
          fileContentsMap.set(fileName, content);
        }
      })
    );
  } else {
    fileNames = fs
      .readdirSync(postsDirectory)
      .filter(
        (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
      );
  }

  const currentDate = startOfDay(new Date());

  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileContents =
        source === "github"
          ? fileContentsMap.get(fileName)
          : fs.readFileSync(path.join(postsDirectory, fileName), "utf8");

      if (!fileContents) {
        console.warn(`Failed to load file contents for: ${fileName}`);
        return null;
      }

      const metadata = extractMetadata(fileContents);

      if (!metadata) {
        console.warn(`Metadata missing for file: ${fileName}`);
        return null;
      }

      const postId = metadata.id;
      const likesCount = await fetchLikesCount(postId);

      const slug = fileName.replace(".mdx", "");

      const post = {
        slug,
        ...metadata,
        likes: likesCount,
      };

      const postDate = startOfDay(parseISO(metadata.publishDate));
      return {
        post,
        isPublished: !metadata.draft && postDate <= currentDate,
      };
    })
  );

  const publishedPosts = [];
  const finalAllPosts = [];

  for (const item of allPosts) {
    if (item?.post) {
      finalAllPosts.push(item.post);
      if (item.isPublished) {
        publishedPosts.push(item.post);
      }
    }
  }

  const allPostsPath = path.join(process.cwd(), "public/cache/all-posts.json");
  fs.writeFileSync(allPostsPath, JSON.stringify(finalAllPosts, null, 2));

  const publishedPostsPath = path.join(
    process.cwd(),
    "public/cache/published-posts.json"
  );
  fs.writeFileSync(publishedPostsPath, JSON.stringify(publishedPosts, null, 2));

  return publishedPosts;
}

// Automatically run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePostsCache().catch((error) => {
    console.error("Error generating posts cache:", error);
    process.exit(1);
  });
}
