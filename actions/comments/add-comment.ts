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
  repliedToId = null, // ✅ default to null if missing
}: {
  postSlug: string;
  authorName: string;
  content: string;
  repliedToId?: string | null;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mdxblog_comments")
    .insert([
      {
        post_slug: postSlug,
        author_name: authorName,
        content: content,
        replied_to_id: repliedToId ?? null,
      },
    ])
    .select("*");

  if (error) throw new Error(error.message);
  return data;
}
