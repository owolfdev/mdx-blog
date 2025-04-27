"use server";

import { createClient } from "@/utils/supabase/server";

type AddCommentParams = {
  postSlug: string;
  authorName: string;
  content: string;
  repliedToId?: string | null;
};

export async function addComment({
  postSlug,
  authorName,
  content,
  repliedToId = null,
}: AddCommentParams) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mdxblog_comments")
    .insert([
      {
        post_slug: postSlug,
        author_name: authorName,
        content,
        replied_to_id: repliedToId,
      },
    ])
    .select("*"); // Select inserted row to return it

  if (error) {
    console.error("Add comment error:", error.message);
    throw new Error(error.message);
  }

  return data;
}
