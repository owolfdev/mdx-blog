import { createClient } from "@supabase/supabase-js"; // Adjust the import according to your project structure

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function countLikes(postId: string) {
  console.log("countLikes", postId);
  try {
    const { error, count } = await supabase
      .from("likes_for_mdx_blog")
      .select("id", { count: "exact" })
      .eq("post_id", postId);

    if (error) throw error;

    return { success: true, count: count || 0 };
  } catch (error) {
    console.error("Error in countLikes:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

// export async function createTable() {
//   console.log("createTable");
//   try {
//     const { error } = await supabase.rpc("create_likes_for_mdx_blog");

//     if (error) throw error;

//     return { success: true };
//   } catch (error) {
//     console.error("Error in createTable:", (error as Error).message);
//     return { success: false, error: (error as Error).message };
//   }
// }

// export async function removeTable() {
//   console.log("removeTable");
//   try {
//     const { error } = await supabase.rpc("drop_likes_for_mdx_blog");

//     if (error) throw error;

//     return { success: true };
//   } catch (error) {
//     console.error("Error in removeTable:", (error as Error).message);
//     return { success: false, error: (error as Error).message };
//   }
// }

export async function addLike(postId: string, userId: string) {
  console.log("addLike", postId, userId);
  try {
    if (!postId || !userId) {
      throw new Error("Missing postId or userId");
    }

    const { data, error } = await supabase
      .from("likes_for_mdx_blog")
      .insert([{ post_id: postId, user_id: userId }]);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error in addLike:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function removeLike(postId: string, userId: string) {
  console.log("removeLike", postId, userId);
  try {
    if (!postId || !userId) {
      throw new Error("Missing postId or userId");
    }

    const { data, error } = await supabase
      .from("likes_for_mdx_blog")
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
  console.log("removeAllLikes");
  try {
    const { data, error } = await supabase.from("likes_for_mdx_blog").delete();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error in removeAllLikes:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}
