import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getContactMessages(req, res) {
  const { data, error } = await supabase.from("contact_mdx_blog").select("*");
  return data;
  //   if (error) {
  //     console.log("Error fetching contact_mdx_blog:", error);
  //     res.status(500).json({ error: "Error fetching contact_mdx_blog" });
  //   } else {
  //     res.status(200).json(data);
  //   }
}
