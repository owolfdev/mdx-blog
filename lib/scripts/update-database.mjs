import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function updateDatabase() {
  // Ensure the object passed to insert() has key-value pairs matching your table schema
  const { data, error } = await supabase
    .from("_update_database")
    .insert([{ update: new Date().toISOString() }]);

  // Handling the response and errors appropriately
  if (error) {
    throw new Error(`Failed to update database: ${error.message}`);
  }

  return data;
}
