"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function sendContactMessage(values: {
  email: string;
  name: string;
  message: string;
  type: string;
}) {
  console.log("Received Values:", values);

  // Validation schema
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    message: z.string().min(20),
    type: z.string().min(2),
  });

  try {
    // Validate the values
    const validatedValues = schema.parse(values);
    console.log("Validated Values:", validatedValues);

    // Save the form values to the Supabase table
    const { data, error } = await supabase
      .from("contact_mdx_blog")
      .insert([validatedValues])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error.message); // Log specific Supabase error message
      throw new Error(`Supabase insert error: ${error.message}`); // Throw an error with a detailed message
    }

    // Ensure data has been inserted correctly
    if (!data || data.length === 0) {
      throw new Error("No data returned from Supabase after insert.");
    }

    console.log("Saved to Supabase:", data);

    // Revalidate the path and redirect to the thank-you page
    revalidatePath("/contact");
    // redirect("/contact/thank-you");
  } catch (error) {
    // Log the error in detail to help with debugging
    console.error("Error in sendContactMessage:", error);
    throw new Error(`Error submitting form: ${(error as Error).message}`);
  }
}
