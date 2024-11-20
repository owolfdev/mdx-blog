"use server";

import { generatePostsCache } from "@/lib/cache/generate-cache-posts.mjs"; // Import the external function
// import { generatePostsCache } from "@/lib/cache/generate-posts-cache";

// Cache posts action using the imported generatePostsCache function
export const cachePostsAction = async () => {
  "use server";
  try {
    const posts = await generatePostsCache(); // Call the imported function

    return {
      ok: true,
      status: 200,
      data: posts,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: `Failed to generate posts cache ${error}`,
    };
  }
};
