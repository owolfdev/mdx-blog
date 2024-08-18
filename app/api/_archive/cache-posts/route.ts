import { generatePostsCache } from "@/lib/posts-utils.mjs";

export async function POST(req: Request) {
  if (req.method === "POST") {
    console.log("Generating posts cache");

    const postsCache = generatePostsCache();

    return new Response(JSON.stringify(postsCache), {
      headers: {
        "content-type": "application/json",
      },
    });
  } else {
    // Handle any non-POST requests
    return new Response(
      JSON.stringify({
        message: "This endpoint only accepts POST requests",
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
