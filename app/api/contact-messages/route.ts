// app/api/contacts/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
