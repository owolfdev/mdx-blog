import fs from "node:fs";
import path from "node:path";
import { parseISO, startOfDay } from "date-fns";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env.local file
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function extractMetadata(fileContents) {
  const metadataMatch = fileContents.match(
    /export const metadata = ({[\s\S]*?});/
  );
  if (metadataMatch) {
    // biome-ignore lint/security/noGlobalEval: <explanation>
    const metadata = eval(`(${metadataMatch[1]})`); // Caution: using eval can be dangerous if not handled properly
    return metadata;
  }
  return null;
}

// Function to fetch likes count from Supabase
async function fetchLikesCount(postId) {
  const { data, error } = await supabase
    .from("likes_for_mdx_blog_2")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    return 0; // Return 0 if there's an error
  }

  return data.length; // Return the count of likes
}

export async function generatePostsCache() {
  console.log("Generating posts cache...");

  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(
      (fileName) => !fileName.startsWith(".") && fileName.endsWith(".mdx")
    );

  const currentDate = startOfDay(new Date());

  const allPosts = [];
  const publishedPosts = [];

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const metadata = extractMetadata(fileContents);

    console.log("metadata:", metadata);

    if (!metadata) {
      continue; // Skip if metadata is missing
    }

    const postId = metadata.id; // Assuming id is still part of the metadata
    const likesCount = await fetchLikesCount(postId);

    const slug = fileName.replace(".mdx", "");

    const post = {
      slug,
      ...metadata,
      likes: likesCount,
    };

    // Add post to allPosts
    allPosts.push(post);

    // Check if post should be added to publishedPosts
    const postDate = startOfDay(parseISO(metadata.publishDate));
    if (!metadata.draft && postDate <= currentDate) {
      publishedPosts.push(post);
    }
  }

  // Write all posts to all-posts.json
  const allPostsPath = path.join(process.cwd(), "cache/all-posts.json");
  fs.writeFileSync(allPostsPath, JSON.stringify(allPosts, null, 2));

  // Write published posts to published-posts.json
  const publishedPostsPath = path.join(
    process.cwd(),
    "cache/published-posts.json"
  );
  fs.writeFileSync(publishedPostsPath, JSON.stringify(publishedPosts, null, 2));

  return publishedPosts;
}
