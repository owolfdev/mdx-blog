// app/contact/actions.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function sendContactMessage(values: {
  email: string;
  name: string;
  message: string;
  type: string;
}) {
  console.log("Received Values:", values);

  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    message: z.string().min(20),
    type: z.string().min(2),
  });

  try {
    const validatedValues = schema.parse(values);
    console.log("Validated Values:", validatedValues);

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("mdxblog_contact_messages")
      .insert([validatedValues])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned from Supabase after insert.");
    }

    console.log("Saved to Supabase:", data);
    revalidatePath("/contact");
  } catch (error) {
    console.error("Error in sendContactMessage:", error);
    throw new Error(`Error submitting form: ${(error as Error).message}`);
  }
}
