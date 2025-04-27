"use server";

import { createClient } from "@/utils/supabase/server";

type DeleteCommentParams = {
  id: string;
};

export async function deleteComment({ id }: DeleteCommentParams) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("mdxblog_comments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete comment error:", error.message);
    throw new Error(error.message);
  }
}
