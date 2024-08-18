import { NextResponse } from "next/server";
import { editFileLocally } from "@/lib/edit-file-locally";
import { editFileInVSCode } from "@/lib/edit-file-in-vs-code";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const data = await req.json();

      editFileInVSCode(data);

      return new Response(JSON.stringify("File saved successfully"), {
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
