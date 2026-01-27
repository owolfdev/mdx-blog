"use server"; // Indicate this is a server action
import fs from "node:fs";
import path from "node:path";
import {
  getGithubBranch,
  getGithubRepo,
  githubGetFileContent,
  githubListDirectory,
  shouldUseGithubSource,
} from "@/lib/posts/mdx-storage";

interface GetPostsParams {
  type?: string;
  limit?: number;
  page?: number;
  searchTerm?: string;
  sort?: string;
  category?: string;
}

interface Post {
  slug: string;
  type: string;
  title: string;
  author: string;
  publishDate: string;
  description: string;
  categories: string[];
  tags: string[];
  modifiedDate?: string;
  image?: string | null;
  draft?: boolean;
  relatedPosts?: string[];
  likes?: number;
  formattedDate?: string; // For client-side display formatting
}

export async function getPosts({
  type = "",
  limit,
  page,
  searchTerm,
  sort = "date_asc",
  category = "",
}: GetPostsParams) {
  // TODO: Add cache
  try {
    const cacheFilePath = path.join(
      process.cwd(),
      "public/cache/published-posts.json"
    );

    let posts: Post[] = [];
    const useGithubSource = shouldUseGithubSource();
    const useCache =
      !useGithubSource &&
      process.env.NODE_ENV !== "production" &&
      fs.existsSync(cacheFilePath);

    if (useCache) {
      const jsonData = fs.readFileSync(cacheFilePath, "utf8");
      posts = JSON.parse(jsonData).filter(
        (blog: Post) => !blog.slug.startsWith(".")
      );
    } else if (useGithubSource) {
      const repo = getGithubRepo();
      const branch = getGithubBranch();
      const token = process.env.GITHUB_TOKEN ?? "";
      const entries = await githubListDirectory(
        repo,
        branch,
        "content/posts",
        token
      );
      const fileNames = entries
        .filter(
          (entry) =>
            entry.type === "file" &&
            entry.name.endsWith(".mdx") &&
            !entry.name.startsWith(".")
        )
        .map((entry) => entry.name);

      const currentDate = new Date();
      const loadedPosts = await Promise.all(
        fileNames.map(async (fileName) => {
          const fileContent = await githubGetFileContent(
            repo,
            branch,
            `content/posts/${fileName}`,
            token
          );
          if (!fileContent) {
            return null;
          }
          const metadataMatch = fileContent.match(
            /export const metadata = ({[\s\S]*?});/
          );
          if (!metadataMatch) {
            return null;
          }
          // biome-ignore lint/security/noGlobalEval: Metadata comes from trusted MDX files.
          const metadata = eval(`(${metadataMatch[1]})`);
          const slug = fileName.replace(".mdx", "");
          const publishDate = metadata.publishDate
            ? new Date(metadata.publishDate)
            : null;

          if (metadata.draft) {
            return null;
          }

          if (publishDate && publishDate > currentDate) {
            return null;
          }

          return {
            slug,
            type: metadata.type ?? "",
            title: metadata.title ?? "",
            author: metadata.author ?? "",
            publishDate: metadata.publishDate ?? "",
            description: metadata.description ?? "",
            categories: metadata.categories ?? [],
            tags: metadata.tags ?? [],
            modifiedDate: metadata.modifiedDate,
            image: metadata.image ?? null,
            draft: metadata.draft ?? false,
            relatedPosts: metadata.relatedPosts ?? [],
          } as Post;
        })
      );

      posts = loadedPosts.filter(Boolean) as Post[];
    } else {
      const postsDirectory = path.join(process.cwd(), "content/posts");
      const fileNames = fs
        .readdirSync(postsDirectory)
        .filter(
          (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
        );

      const currentDate = new Date();
      posts = fileNames
        .map((fileName) => {
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const metadataMatch = fileContents.match(
            /export const metadata = ({[\s\S]*?});/
          );
          if (!metadataMatch) {
            return null;
          }
          // biome-ignore lint/security/noGlobalEval: Metadata comes from trusted MDX files.
          const metadata = eval(`(${metadataMatch[1]})`);
          const slug = fileName.replace(".mdx", "");
          const publishDate = metadata.publishDate
            ? new Date(metadata.publishDate)
            : null;

          if (metadata.draft) {
            return null;
          }

          if (publishDate && publishDate > currentDate) {
            return null;
          }

          return {
            slug,
            type: metadata.type ?? "",
            title: metadata.title ?? "",
            author: metadata.author ?? "",
            publishDate: metadata.publishDate ?? "",
            description: metadata.description ?? "",
            categories: metadata.categories ?? [],
            tags: metadata.tags ?? [],
            modifiedDate: metadata.modifiedDate,
            image: metadata.image ?? null,
            draft: metadata.draft ?? false,
            relatedPosts: metadata.relatedPosts ?? [],
          } as Post;
        })
        .filter(Boolean) as Post[];
    }

    // console.log("Posts:", posts);

    // Filter posts by type
    posts = posts.filter(
      (post: Post) => !post.slug.startsWith(".") && post.type.includes(type)
    );

    // console.log("Type:", type);
    // console.log("Posts after type filter:", posts.length);

    // Search filter
    if (searchTerm && searchTerm.trim() !== "") {
      const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean); // Split and normalize

      posts = posts.filter((post: Post) => {
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (Array.isArray(post.tags) &&
            searchWords.some((word) =>
              post.tags.some((tag) => tag.toLowerCase() === word)
            )) || // Match any word with any tag
          (Array.isArray(post.categories) &&
            post.categories.some((cat) =>
              cat.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        );
      });
    }

    // console.log("Posts after search filter:", posts.length);

    // Category filter
    if (category && category.trim() !== "") {
      posts = posts.filter((post: Post) => {
        return (
          Array.isArray(post.categories) &&
          post.categories.some((cat) =>
            cat.toLowerCase().includes(category.toLowerCase())
          )
        );
      });
    }

    // console.log("Posts after category filter:", posts.length);

    const totalPosts = posts.length;

    // Sort by date, title, or likes
    const [sortBy, sortOrder] = sort.split("_");

    posts.sort((a: Post, b: Post) => {
      if (sortBy === "date") {
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);

        if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) {
          console.error("Invalid date found", {
            dateA: a.publishDate,
            dateB: b.publishDate,
          });
          return 0;
        }

        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      if (sortBy === "likes") {
        const likesA = a.likes || 0;
        const likesB = b.likes || 0;
        return sortOrder === "asc" ? likesA - likesB : likesB - likesA;
      }

      return 0;
    });

    // console.log("Posts after sort:", posts.length);

    // console.log(
    //   "Posts:",
    //   posts.map((post) => post.title)
    // );

    // Format dates for each post
    for (const post of posts) {
      const date = new Date(post.publishDate);
      post.formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // console.log(
    //   "Posts after date formatting:",
    //   posts.map((post) => post.formattedDate)
    // );

    // Pagination
    const start = ((page ?? 1) - 1) * (limit ?? 10);

    if (limit) {
      posts = posts.slice(start, start + limit);
    }

    // console.log("Posts fetched:", posts);

    return { posts, totalPosts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}
