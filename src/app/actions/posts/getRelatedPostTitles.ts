"use server";

import fs from "node:fs";
import path from "node:path";

export async function getRelatedPostTitles(relatedSlugs: string[] | null) {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return [];
  }

  try {
    const projectRoot = process.cwd();
    const filePath = path.join(projectRoot, "public/cache/all-posts.json");

    // Read and parse the JSON data from the cache
    const allPosts = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Find the titles of the related posts by slug
    const relatedPostTitles = relatedSlugs
      .map((slug) => {
        const post = allPosts.find(
          (post: { slug: string }) => post.slug === slug
        );
        return post ? { slug, title: post.title } : null;
      })
      .filter(Boolean); // Filter out any null values

    return relatedPostTitles;
  } catch (error) {
    console.error("Error reading or parsing the all-posts.json file:", error);
    return [];
  }
}
