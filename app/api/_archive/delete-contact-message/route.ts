import type { NextApiRequest, NextApiResponse } from "next";
import { deleteContactMessage } from "@/lib/supabase-utils.mjs";

export async function POST(req: Request) {
  if (req.method === "POST") {
    // Process a POST request
    const data = await req.json();
    console.log("data from delete-contact-message", data);
    deleteContactMessage(data.id);
    return new Response(
      JSON.stringify({
        message: "This is a POST request",
      }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}

// import { deleteLocalFile } from "@/lib/delete-post";
// import { deleteContactMessage } from "@/lib/supabase-utils.mjs";

// export async function POST(req: Request) {
//   if (req.method === "POST") {
//     try {
//       const data = await req.json();

//       deleteContactMessage(data);
//     } catch (error) {
//       console.error("Error:", error);
//       return new Response(
//         JSON.stringify({
//           message: "Error in processing your request",
//         }),
//         {
//           status: 500,
//           headers: {
//             "content-type": "application/json",
//           },
//         }
//       );
//     }
//   } else {
//     // Handle any non-POST requests
//     return new Response(
//       JSON.stringify({
//         message: "This endpoint only accepts POST requests",
//       }),
//       {
//         headers: {
//           "content-type": "application/json",
//         },
//       }
//     );
//   }
// }
