"use server";

import { createClient } from "@/utils/supabase/server";

type EditCommentParams = {
  id: string;
  content: string;
};

export async function editComment({ id, content }: EditCommentParams) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("mdxblog_comments")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Edit comment error:", error.message);
    throw new Error(error.message);
  }
}
