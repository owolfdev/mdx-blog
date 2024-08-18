import { getAllPosts } from "@/lib/posts-utils.mjs";

export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      // Get the data
      const data = getAllPosts();

      // Return the data in the response
      return new Response(
        JSON.stringify(data), // Send the posts data
        {
          status: 200, // HTTP status code 200 OK
          headers: {
            "content-type": "application/json",
          },
        }
      );
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
    // Handle any non-GET requests
    return new Response(
      JSON.stringify({
        message: "This endpoint only accepts GET requests",
      }),
      {
        status: 405, // HTTP status code 405 Method Not Allowed
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
