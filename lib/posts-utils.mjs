// cachePosts.js in the utils folder

import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import { notFound } from "next/navigation";
import { notFound } from "next/navigation.js";

////////////////////
// Generate the cache
export function generatePostsCache() {
  // Define the directory where your MDX posts are stored
  const postsDirectory = path.join(process.cwd(), "data/posts");

  // Read all file names in the posts directory
  const fileNames = fs.readdirSync(postsDirectory);

  // Process each file and extract front matter
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontMatter } = matter(fileContents);

    // Return an object with the slug and front matter
    return {
      slug,
      ...frontMatter,
    };
  });

  // Define the path for the cache file
  const cachePath = path.join(process.cwd(), "cache/posts.json");

  // Write the posts data to the cache file
  fs.writeFileSync(cachePath, JSON.stringify(posts, null, 2));

  return posts;
}

////////////////////
// Get all posts
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
        (post.title &&
          post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.description &&
          post.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.author &&
          post.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(post.tags) &&
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )) ||
        (Array.isArray(post.categories) &&
          post.categories.some((cat) =>
            cat.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      );
    });
  }

  const totalPosts = posts.length;

  // sort by date
  const [sortBy, sortOrder] = sort.split("_");

  posts.sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "title") {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
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
