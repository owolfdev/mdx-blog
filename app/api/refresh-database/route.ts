import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const POST = async (req: Request) => {
  try {
    // Insert a new row; id and created_at will be handled by the database
    const { error } = await supabase.from("refresh_database").insert([{}]);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Data inserted successfully." },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  return NextResponse.json(
    { error: "Method GET not allowed." },
    { status: 405 }
  );
};
