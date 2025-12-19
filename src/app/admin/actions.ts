// ./actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import type { DbComment, Comment } from "@/types/comment";

export async function getUnapprovedComments(): Promise<Comment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("mdxblog_comments")
    .select("*")
    .eq("is_approved", false)
    .order("created_at", { ascending: false });

  console.log("data", data);

  if (error) {
    console.error("Error fetching unapproved comments:", error);
    return [];
  }

  return (data ?? []).map((comment: DbComment) => ({
    id: comment.id,
    postSlug: comment.post_slug,
    authorName: comment.author_name,
    content: comment.content,
    repliedToId: comment.replied_to_id,
    createdAt: comment.created_at,
    updatedAt: comment.updated_at,
    approved: comment.is_approved, // camelCase!
  }));
}
