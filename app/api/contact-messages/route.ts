import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Extract query parameters
    const url = new URL(req.url);
    const password = url.searchParams.get("password");

    // Validate the password
    const validPassword = process.env.CONTACT_API_PASSWORD;
    if (!password || password !== validPassword) {
      return NextResponse.json(
        { error: `Unauthorized access. Password: ${password}` },
        { status: 401 }
      );
    }

    // Initialize Supabase client
    const supabase = await createClient();

    // Query all records from the 'contacts' table
    const { data: contactMessages, error } = await supabase
      .from("mdxblog_contact_messages")
      .select("*");

    if (error) {
      console.error("Error fetching contacts:", error);
      return NextResponse.json(
        { error: "Failed to fetch contacts." },
        { status: 500 }
      );
    }

    // Return the data as JSON
    return NextResponse.json({ contactMessages });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
