"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Server action
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

  // Validate incoming values
  const validatedValues = schema.parse(values);
  console.log("Validated Values:", validatedValues);

  // Simulate server-side logic (e.g., saving to DB)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Revalidate the page to update content
  revalidatePath("/contact");
  redirect("/contact/thank-you");
}
