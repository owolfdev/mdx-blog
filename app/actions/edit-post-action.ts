"use server";

import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { generatePostsCache } from "@/app/actions/cache/generate-posts-cache";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function editPostAction(data: any, openInVSCode = false) {
  const {
    date,
    title,
    categories,
    tags,
    originalFilename,
    filename,
    image,
    draft,
    relatedPosts,
  } = data;

  const projectRoot = process.cwd();
  const originalFilePath = path.join(
    projectRoot,
    "content/posts",
    originalFilename
  );
  const newFilePath = path.join(projectRoot, "content/posts", filename);

  if (!fs.existsSync(originalFilePath)) {
    console.error("Original file does not exist:", originalFilePath);
    throw new Error(`Original file does not exist: ${originalFilePath}`);
  }

  // Check if the new filename already exists and is not the same as the original file
  if (originalFilename !== filename && fs.existsSync(newFilePath)) {
    return {
      ok: false,
      status: 409, // Conflict status code
      error:
        "A post with this slug already exists. Please choose a different slug.",
    };
  }

  // Read the existing file content
  const existingContent = fs.readFileSync(originalFilePath, "utf8");

  // Extract existing content (excluding metadata)
  const contentMatch = existingContent.match(
    /export const metadata = {[\s\S]+};\n\n([\s\S]*)/
  );
  const existingContentBody = contentMatch ? contentMatch[1] : "";

  // Extract the existing ID from the metadata if present
  const idMatch = existingContent.match(/id:\s+"([^"]+)"/);
  const existingId = idMatch ? idMatch[1] : "";

  // Format tags for metadata
  const formattedTags = tags
    .split(", ")
    .map((tag: string) => `"${tag.trim()}"`)
    .join(", ")
    .replace(/,\s*$/, ""); // Remove trailing comma

  // Format categories for metadata
  const formattedCategories = categories
    .map((category: string) => `"${category}"`)
    .join(", ")
    .replace(/,\s*$/, "");

  // Format relatedPosts as an array of strings or default to an empty array
  const formattedRelatedPosts = relatedPosts
    ? relatedPosts
        .split(",")
        .map((post: string) => `"${post.trim()}"`)
        .filter(Boolean)
    : []; // Ensure it's an array or default to an empty array

  // Construct the new file content
  const newFileContent = [
    "export const metadata = {",
    `  id: "${existingId || data.id}",`, // Preserve existing ID or use the provided ID
    `  type: "blog",`,
    `  title: "${title}",`,
    `  author: "${data.author}",`,
    `  publishDate: "${date}",`,
    `  description: "${data.description}",`,
    `  categories: [${formattedCategories}],`,
    `  tags: [${formattedTags}],`,
    `  modifiedDate: "${new Date().toISOString()}",`, // Update the modifiedDate
    `  image: ${image ? `"${image}"` : "null"},`,
    `  draft: ${draft},`,
    `  relatedPosts: [${formattedRelatedPosts.join(", ")}]`,
    "};",
    "",
    data.content || existingContentBody,
  ].join("\n");

  // Write the updated file content to the new file path
  try {
    fs.writeFileSync(newFilePath, newFileContent);
    console.log("File saved to", newFilePath);

    // If the slug has changed, delete the original file
    if (originalFilename !== filename) {
      fs.unlinkSync(originalFilePath);
      console.log("Original file deleted:", originalFilePath);
    }

    // Regenerate posts cache
    await generatePostsCache();

    // Conditionally open the file in VS Code
    if (openInVSCode) {
      exec(`code "${newFilePath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    }

    return {
      ok: true,
      status: 200,
      data: "File saved successfully",
      newSlug: filename.replace(".mdx", ""), // Assuming the slug is derived from the filename without the extension
    };
  } catch (err) {
    console.error("Error writing file:", err);
    return {
      ok: false,
      status: 500,
      error: "Failed to save file",
    };
  }
}
