import fs from "node:fs";
import path from "node:path";
import { parseISO, startOfDay } from "date-fns";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env.local file
dotenv.config({ path: ".env.local" });

// Use the service role key
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
    const metadata = eval(`(${metadataMatch[1]})`);
    return metadata;
  }
  return null;
}

async function fetchLikesCount(postId) {
  const { count, error } = await supabase
    .from("likes_for_mdx_blog")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error(`Error fetching likes for postId: ${postId}`, error);
    return 0;
  }

  return count || 0;
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

  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const metadata = extractMetadata(fileContents);

      if (!metadata) {
        console.warn(`Metadata missing for file: ${fileName}`);
        return null;
      }

      const postId = metadata.id;
      const likesCount = await fetchLikesCount(postId);

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

  const allPostsPath = path.join(process.cwd(), "cache/all-posts.json");
  fs.writeFileSync(allPostsPath, JSON.stringify(finalAllPosts, null, 2));

  const publishedPostsPath = path.join(
    process.cwd(),
    "cache/published-posts.json"
  );
  fs.writeFileSync(publishedPostsPath, JSON.stringify(publishedPosts, null, 2));

  return publishedPosts;
}
