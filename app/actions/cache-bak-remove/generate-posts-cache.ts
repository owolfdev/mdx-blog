"use server";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@/utils/supabase/server";

import { config } from "@/lib/config/config";
import { parseISO, startOfDay } from "date-fns";

function extractMetadata(fileContents: string) {
  const metadataMatch = fileContents.match(
    /export const metadata = ({[\s\S]*?});/
  );

  if (metadataMatch) {
    try {
      // Parse the metadata safely
      const metadataString = metadataMatch[1];
      return new Function(`return ${metadataString}`)(); // Safely parse the object
    } catch (error) {
      console.error("Failed to parse metadata:", error);
      return null;
    }
  }

  console.warn("No metadata match found in file contents.");
  return null;
}

async function fetchLikesCount(postId: string) {
  const supabase = await createClient();
  const tableName = config.likesTable;
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error(`Error fetching likes for postId: ${postId}`, error);
    return 0;
  }

  return count || 0;
}

export async function generatePostsCache() {
  try {
    const postsDirectory = path.join(process.cwd(), "content/posts");
    console.log(`Posts directory: ${postsDirectory}`);

    const fileNames = fs
      .readdirSync(postsDirectory)
      .filter(
        (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
      );

    console.log(`Found ${fileNames.length} MDX files:`, fileNames);

    const currentDate = startOfDay(new Date());
    const allPosts = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        // console.log(`Processing file: ${fullPath}`);

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const metadata = extractMetadata(fileContents);

        if (!metadata) {
          console.warn(`Metadata missing for file: ${fileName}`);
          return null;
        }

        // console.log(`Metadata for ${fileName}:`, metadata);

        const postId = metadata.id;
        const likesCount = await fetchLikesCount(postId);

        console.log(`Likes count for postId ${postId}: ${likesCount}`);

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

    console.log("Processing completed for all files.");

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

    console.log(`Final all posts count: ${finalAllPosts.length}`);
    console.log(`Published posts count: ${publishedPosts.length}`);

    const cacheDir = path.join(process.cwd(), "public/cache");
    console.log(`Cache directory: ${cacheDir}`);

    if (!fs.existsSync(cacheDir)) {
      console.log("Creating cache directory...");
      fs.mkdirSync(cacheDir);
    }

    console.log("Writing cache files...");

    fs.writeFileSync(
      path.join(cacheDir, "all-posts.json"),
      JSON.stringify(finalAllPosts, null, 2)
    );

    fs.writeFileSync(
      path.join(cacheDir, "published-posts.json"),
      JSON.stringify(publishedPosts, null, 2)
    );

    console.log("Cache files written successfully.");
    return publishedPosts;
  } catch (error) {
    console.error("❌ Error in generatePostsCache:", error);
    throw error; // Propagate error for higher-level handling
  }
}
