"use server";

import { createClient } from "@/utils/supabase/server";

export async function approveComment(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("mdxblog_comments")
    .update({ is_approved: true })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
