import * as dotenv from "dotenv";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.resolve(__dirname, "../../.env.local");
dotenv.config({ path: envPath });

console.log("Resolved .env.local path: ", envPath);
console.log(
  "process.env.NEXT_PUBLIC_SUPABASE_URL:",
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌ Supabase URL or Key is missing. Check your .env.local file and ensure the variables are correctly defined."
  );
  process.exit(1); // Exit if the configuration is invalid
}

console.log("✅ Supabase configuration loaded successfully.");

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Path to likes_new.json file
const LIKES_NEW_FILE = "/Users/wolf/Downloads/MDX_BLOG/likes_new.json";

async function populateLikesTable() {
  try {
    // Read and parse likes_new.json
    const likesData = JSON.parse(readFileSync(LIKES_NEW_FILE, "utf8"));

    console.log(`Read ${likesData.length} entries from ${LIKES_NEW_FILE}`);

    // Insert likes into the mdxblog_likes table
    for (const like of likesData) {
      const { id, created_at, user_id, post_id } = like;

      const { data, error } = await supabase.from("mdxblog_likes").insert([
        {
          id, // bigint
          created_at, // timestamp with time zone
          user_id, // uuid
          post_id, // uuid
        },
      ]);

      if (error) {
        console.error(`❌ Error inserting like (id: ${id}):`, error);
      } else {
        console.log(`✅ Successfully inserted like (id: ${id}):`, data);
      }
    }

    console.log("✅ Likes table population complete.");
  } catch (error) {
    console.error("❌ Error populating likes table:", error);
  }
}

// Run the script
populateLikesTable();
