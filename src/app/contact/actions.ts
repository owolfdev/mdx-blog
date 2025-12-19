// app/contact/actions.ts
"use server";

import { z } from "zod";

const NOTION_API_URL = "https://api.notion.com/v1/pages";
const NOTION_API_KEY = process.env.NOTION_API_KEY || ""; // Add your integration token in .env.local
const DATABASE_ID =
  process.env.NEXT_PUBLIC_NOTION_CONTACT_MESSAGES_DATABASE_ID || ""; // Database ID from .env.local

export async function sendContactMessage(values: {
  email: string;
  name: string;
  message: string;
  type: string;
  subject: string;
  origin: string;
  receivedDate: string;
}) {
  console.log("Received Values:", values);

  // Validation schema
  const schema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    type: z.string().min(2, "Message type must be valid"),
    subject: z.string().min(2, "Subject is required"),
    origin: z.string().nonempty("Origin is required"),
    receivedDate: z.string().nonempty("Received date is required"),
  });

  try {
    // Validate values
    const validatedValues = schema.parse(values);

    // Prepare the payload for Notion API
    const notionPayload = {
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        "Sender Name": {
          rich_text: [
            {
              text: {
                content: validatedValues.name,
              },
            },
          ],
        },
        "Sender Email": {
          email: validatedValues.email,
        },
        Message: {
          rich_text: [
            {
              text: {
                content: validatedValues.message,
              },
            },
          ],
        },
        "Message Type": {
          rich_text: [
            {
              text: {
                content: validatedValues.type,
              },
            },
          ],
        },
        Subject: {
          title: [
            {
              text: {
                content: validatedValues.subject,
              },
            },
          ],
        },
        Origin: {
          rich_text: [
            {
              text: {
                content: validatedValues.origin,
              },
            },
          ],
        },
        "Received Date": {
          date: {
            start: validatedValues.receivedDate,
          },
        },
      },
    };

    // Make the request to Notion API
    const response = await fetch(NOTION_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify(notionPayload),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Failed to create record in Notion:", errorResponse);
      throw new Error(`Failed to create record: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Record successfully created in Notion:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error in sendContactMessage:", error);
    throw new Error(`Error submitting form: ${(error as Error).message}`);
  }
}
