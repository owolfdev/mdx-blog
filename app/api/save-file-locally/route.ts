import { NextResponse } from "next/server";
import { saveFileLocally } from "@/lib/save-file-locally";
import { generatePostsCache } from "@/lib/posts-utils.mjs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const slug = await saveFileLocally(data);

    return new Response(JSON.stringify({ slug }), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: "Error in processing your request",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
