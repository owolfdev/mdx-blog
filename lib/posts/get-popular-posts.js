import fs from "node:fs";
import path from "node:path";

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

    // console.log("Top 5 popular posts:", top5Posts);

    return top5Posts;
  } catch (error) {
    console.error("Error fetching or parsing posts.json:", error);
    return []; // Return empty array or handle error as needed
  }
}
