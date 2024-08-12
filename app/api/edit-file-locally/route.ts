import { NextResponse } from "next/server";
import { editFileLocally } from "@/lib/edit-file-locally";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const data = await req.json();

      if (!data.filename && !data.slug) {
        throw new Error("Either 'filename' or 'slug' field is required.");
      }

      editFileLocally(data);

      return NextResponse.json("File saved successfully");
    } catch (error) {
      let errorMessage = "Error in processing your request";

      if (error instanceof Error) {
        console.error("Error:", error.message);
        errorMessage = error.message;
      } else {
        console.error("Unknown error:", error);
      }

      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
  } else {
    // Handle any non-POST requests
    return NextResponse.json(
      { message: "This endpoint only accepts POST requests" },
      { status: 405 } // 405 Method Not Allowed
    );
  }
}
