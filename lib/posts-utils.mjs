import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation.js";
import { startOfDay, parseISO } from "date-fns";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Function to fetch likes count from Supabase
async function fetchLikesCount(postId) {
  const { data, error } = await supabase
    .from("likes_for_mdx_blog")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    console.error(`Error fetching likes for post ${postId}:`, error.message);
    return 0; // Return 0 if there's an error
  }

  return data.length; // Return the count of likes
}

// Generate the cache
export async function generatePostsCache() {
  const postsDirectory = path.join(process.cwd(), "data/posts");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(
      (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
    );

  const currentDate = startOfDay(new Date()); // Get the start of the current day

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data: frontMatter } = matter(fileContents);

      const postDate = startOfDay(parseISO(frontMatter.date)); // Parse the date string to a Date object

      // Skip future-dated posts and include posts for the current day
      if (postDate > currentDate) {
        return null;
      }

      const postId = frontMatter.id; // Use the id field from front matter
      const likesCount = await fetchLikesCount(postId);

      const slug = fileName.replace(".mdx", ""); // Remove the .mdx extension

      return {
        slug,
        ...frontMatter,
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

  // Sort by date
  const [sortBy, sortOrder] = sort.split("_");

  posts.sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });

  posts.forEach((post) => {
    const date = new Date(post.date);
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
    const markdownFile = fs.readFileSync(
      path.join("data/posts", slug + ".mdx"),
      "utf-8"
    );
    const { data: frontMatter, content } = matter(markdownFile);

    return {
      frontMatter,
      slug,
      content,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
}

// Get all posts
export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "data/posts");
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
