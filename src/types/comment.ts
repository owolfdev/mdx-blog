// types/comment.ts

// Frontend version (camelCase)
export interface Comment {
  id: string;
  postSlug: string;
  authorName: string | null;
  content: string;
  repliedToId: string | null;
  createdAt: string;
  updatedAt: string | null;
  approved: boolean; // ✅ Add this field
}

// Database version (snake_case from Supabase)
export interface DbComment {
  id: string;
  post_slug: string;
  author_name: string | null;
  content: string;
  replied_to_id: string | null;
  created_at: string;
  updated_at: string | null;
  is_approved: boolean; // ✅ You need to add this too for accuracy
}
