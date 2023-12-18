import { NextResponse } from "next/server";
import { saveFileLocally } from "@/lib/save-file-locally";
import { generatePostsCache } from "@/lib/posts-utils.mjs";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const data = await req.json();

      const filePath = saveFileLocally(data);

      return new Response(JSON.stringify(filePath), {
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
