import { updateDatabase } from "@/lib/scripts/update-database.mjs";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      // Get the data
      const data = await updateDatabase();
      console.log("Data:", data);
      // Return the data in the response
      return new Response(
        JSON.stringify({
          message: "Request processed successfully", // Response message for status 200
          data: data, // Send the posts data
        }),
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
    // Handle any non-POST requests
    return new Response(
      JSON.stringify({
        message: "This endpoint only accepts POST requests",
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
