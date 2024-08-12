import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { startOfDay, parseISO } from "date-fns";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Function to fetch likes count from Supabase
async function fetchLikesCount(postId) {
  const { data, error } = await supabase
    .from("likes_for_mdx_blog_2")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    // console.error(`Error fetching likes for post ${postId}:`, error.message);
    return 0; // Return 0 if there's an error
  }

  return data.length; // Return the count of likes
}

// Generate the cache
// Helper function to extract metadata object
function extractMetadata(fileContents) {
  const metadataMatch = fileContents.match(
    /export const metadata = ({[\s\S]*?});/
  );
  if (metadataMatch) {
    const metadata = eval(`(${metadataMatch[1]})`); // Caution: using eval can be dangerous if not handled properly
    return metadata;
  }
  return null;
}

// Mock function to fetch likes count (replace with actual implementation)
// async function fetchLikesCount(postId) {
//   // Your logic to fetch likes count
//   return 0;
// }

export async function generatePostsCache() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(
      (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
    );

  const currentDate = startOfDay(new Date());

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const metadata = extractMetadata(fileContents);

      if (!metadata) {
        return null;
      }

      const postDate = startOfDay(parseISO(metadata.publishDate));
      if (postDate > currentDate) {
        return null;
      }

      const postId = metadata.id; // Assuming id is still part of the metadata
      const likesCount = await fetchLikesCount(postId);

      const slug = fileName.replace(".mdx", "");

      return {
        slug,
        ...metadata,
        likes: likesCount,
      };
    })
  );

  const cachePath = path.join(process.cwd(), "cache/posts.json");
  fs.writeFileSync(cachePath, JSON.stringify(posts.filter(Boolean), null, 2));

  return posts.filter(Boolean);
}

// Get filtered posts
export function getPosts(
  type = "",
  limit,
  page,
  searchTerm,
  sort = "date_asc"
) {
  const cacheFilePath = path.join(process.cwd(), "cache/posts.json");
  const jsonData = fs.readFileSync(cacheFilePath, "utf8");
  let posts = JSON.parse(jsonData).filter((blog) => !blog.slug.startsWith("."));

  posts = posts.filter(
    (post) => !post.slug.startsWith(".") && post.type.includes(type)
  );

  // Search filter
  if (searchTerm && searchTerm.trim() !== "") {
    posts = posts.filter((post) => {
      return (
        (post?.title &&
          post?.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post?.description &&
          post?.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post?.author &&
          post?.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(post.tags) &&
          post?.tags.some((tag) =>
            tag?.toLowerCase().includes(searchTerm.toLowerCase())
          )) ||
        (Array.isArray(post.categories) &&
          post?.categories.some((cat) =>
            cat?.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      );
    });
  }

  const totalPosts = posts.length;

  // Sort by date (use publishDate instead of date)
  const [sortBy, sortOrder] = sort.split("_");

  posts.sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.publishDate); // Use publishDate
      const dateB = new Date(b.publishDate); // Use publishDate

      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.error("Invalid date found", {
          dateA: a.publishDate,
          dateB: b.publishDate,
        });
        return 0;
      }

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  posts.forEach((post) => {
    const date = new Date(post.publishDate); // Use publishDate
    post.formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Pagination
  const start = (page - 1) * limit;
  if (limit) {
    posts = posts.slice(start, start + limit);
  }

  return { posts, totalPosts };
}

export async function getPost({ slug }) {
  try {
    const filePath = path.join("content/posts", `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Extract metadata and content
    const metadataMatch = fileContent.match(
      /export const metadata = {([\s\S]+?)};\n\n/
    );
    // biome-ignore lint/security/noGlobalEval: <explanation>
    const metadata = metadataMatch ? eval(`({${metadataMatch[1]}})`) : {};
    const content = fileContent
      .replace(/export const metadata = {[\s\S]+?};\n\n/, "")
      .trim();

    return {
      metadata, // Change from frontMatter to metadata
      slug,
      content,
      filename: `${slug}.mdx`, // Add the filename
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
}

// export async function getPost({ slug }) {
//   try {
//     const filePath = path.join("content/blogs", `${slug}.mdx`);
//     const fileContent = fs.readFileSync(filePath, "utf-8");

//     // Extract metadata and content
//     const metadataMatch = fileContent.match(
//       /export const metadata = {([\s\S]+?)};\n\n/
//     );
//     // biome-ignore lint/security/noGlobalEval: <explanation>
//     const metadata = metadataMatch ? eval(`({${metadataMatch[1]}})`) : {};
//     const content = fileContent
//       .replace(/export const metadata = {[\s\S]+?};\n\n/, "")
//       .trim();

//     return {
//       frontMatter: metadata,
//       slug,
//       content,
//     };
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return { notFound: true };
//   }
// }

// Get all posts
export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(
      (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
    );

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontMatter } = matter(fileContents);

    return {
      slug: fileName.replace(".mdx", ""),
      ...frontMatter,
    };
  });

  return posts;
}

// /lib/posts.js

export async function getPopularPosts() {
  console.log("Fetching popular posts...");
  try {
    // Adjust path to match where posts.json is located
    const cacheFilePath = path.join(process.cwd(), "cache/posts.json");
    const jsonData = fs.readFileSync(cacheFilePath, "utf8");
    const data = JSON.parse(jsonData); // Parse JSON data

    // Filter posts with likes
    const postsWithLikes = data.filter((post) => post.likes > 0);

    // Sort by likes in descending order
    postsWithLikes.sort((a, b) => b.likes - a.likes);

    // Select top 5 popular posts
    const top5Posts = postsWithLikes.slice(0, 5);

    console.log("Top 5 popular posts:", top5Posts);

    return top5Posts;
  } catch (error) {
    console.error("Error fetching or parsing posts.json:", error);
    return []; // Return empty array or handle error as needed
  }
}
