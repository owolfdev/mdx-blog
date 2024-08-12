// /lib/scripts/migrate_likes.js

require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");
const fs = require("node:fs");
const path = require("node:path");

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Load the ID mapping file
const idMappingPath = path.join(__dirname, "id_mapping.json");
const idMapping = JSON.parse(fs.readFileSync(idMappingPath, "utf-8"));

// Create a mapping object for easy lookup
const idMap = idMapping.reduce((acc, { old_id, new_id }) => {
  acc[old_id] = new_id;
  return acc;
}, {});

async function migrateLikes() {
  try {
    // Fetch all records from the old table
    const { data: oldLikes, error: fetchError } = await supabase
      .from("likes_for_mdx_blog")
      .select("*");

    if (fetchError) {
      throw fetchError;
    }

    // Prepare the new likes data
    const newLikes = oldLikes.map((like) => ({
      user_id: like.user_id,
      created_at: like.created_at,
      id: like.id,
      post_id: idMap[like.post_id] || like.post_id, // Use the new ID if available
    }));

    // Insert the new likes into the new table
    const { error: insertError } = await supabase
      .from("likes_for_mdx_blog_2")
      .insert(newLikes);

    if (insertError) {
      throw insertError;
    }

    console.log("Data migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error.message);
  }
}

// Run the migration
migrateLikes();
