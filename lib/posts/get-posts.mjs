import fs from "node:fs";
import path from "node:path";

// Get filtered posts
export function getPosts(
  // biome-ignore lint/style/useDefaultParameterLast: <explanation>
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
        post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post?.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

      if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) {
        console.error("Invalid date found", {
          dateA: a.publishDate,
          dateB: b.publishDate,
        });
        return 0;
      }

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    if (sortBy === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  // biome-ignore lint/complexity/noForEach: <explanation>
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
