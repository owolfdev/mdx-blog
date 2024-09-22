import { createClient } from "@supabase/supabase-js"; // Adjust the import according to your project structure
import { config } from "@/lib/config/config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function countLikes(postId: string) {
  const tableName = config.likesTable; // Accessing table name from config
  console.log("countLikes", postId);
  try {
    const { error, count } = await supabase
      .from(tableName)
      .select("id", { count: "exact" })
      .eq("post_id", postId);

    if (error) throw error;

    return { success: true, count: count || 0 };
  } catch (error) {
    console.error("Error in countLikes:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function addLike(postId: string, userId: string) {
  const tableName = config.likesTable;
  console.log("addLike", postId, userId);
  try {
    if (!postId || !userId) {
      throw new Error("Missing postId or userId");
    }

    const { data, error } = await supabase
      .from(tableName)
      .insert([{ post_id: postId, user_id: userId }]);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error in addLike:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function removeLike(postId: string, userId: string) {
  const tableName = config.likesTable;
  console.log("removeLike", postId, userId);
  try {
    if (!postId || !userId) {
      throw new Error("Missing postId or userId");
    }

    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error in removeLike:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function removeAllLikes() {
  const tableName = config.likesTable; // Accessing table name from config
  console.log("removeAllLikes");
  try {
    const { data, error } = await supabase.from(tableName).delete();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error in removeAllLikes:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function isPostLikedByUser(postId: string, userId: string) {
  const tableName = config.likesTable; // Accessing table name from config
  console.log("isPostLikedByUser", postId, userId);
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .single(); // We use single() to ensure we get only one match.

    if (error) throw error;

    return { success: true, liked: !!data }; // If data is returned, the post is liked.
  } catch (error) {
    console.error("Error in isPostLikedByUser:", (error as Error).message);
    return { success: false, error: (error as Error).message, liked: false };
  }
}
