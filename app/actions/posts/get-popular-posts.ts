"use server";

import fs from "node:fs/promises";
import path from "node:path";

export const getPopularPosts = async () => {
  try {
    // Define the path to the JSON file
    const cacheFilePath = path.join(
      process.cwd(),
      "public/cache/published-posts.json"
    );

    // Read and parse the JSON data
    const jsonData = await fs.readFile(cacheFilePath, "utf8");
    const data = JSON.parse(jsonData);

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: expected an array.");
    }

    // Filter posts with likes > 0
    const postsWithLikes = data.filter((post) => post.likes > 0);

    // Sort by likes in descending order
    postsWithLikes.sort((a, b) => b.likes - a.likes);

    // Select the top 5 posts
    const top5Posts = postsWithLikes.slice(0, 5);

    return {
      ok: true,
      status: 200,
      data: top5Posts,
    };
  } catch (error: unknown) {
    console.error(
      "Error fetching popular posts:",
      error instanceof Error ? error.message : String(error)
    );

    return {
      ok: false,
      status: 500,
      error: "Failed to fetch popular posts",
    };
  }
};
