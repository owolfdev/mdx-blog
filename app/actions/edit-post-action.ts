"use server";

import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { generatePostsCache } from "@/lib/cache/generate-cache-posts.mjs";

interface EditPostData {
  date: string;
  title: string;
  categories: string[];
  tags: string;
  originalFilename: string;
  filename: string;
  draft: boolean;
  image?: string | null; // Allow `null` for compatibility with the form
  relatedPosts?: string;
  id?: string;
  author?: string;
  description?: string;
  content?: string;
}

export async function editPostAction(data: EditPostData, openInVSCode = false) {
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

  if (originalFilename !== filename && fs.existsSync(newFilePath)) {
    return {
      ok: false,
      status: 409,
      error:
        "A post with this slug already exists. Please choose a different slug.",
    };
  }

  const existingContent = fs.readFileSync(originalFilePath, "utf8");

  const contentMatch = existingContent.match(
    /export const metadata = {[\s\S]+};\n\n([\s\S]*)/
  );
  const existingContentBody = contentMatch ? contentMatch[1] : "";

  const idMatch = existingContent.match(/id:\s+"([^"]+)"/);
  const existingId = idMatch ? idMatch[1] : "";

  const formattedTags = tags
    .split(", ")
    .map((tag) => `"${tag.trim()}"`)
    .join(", ")
    .replace(/,\s*$/, "");

  const formattedCategories = categories
    .map((category) => `"${category}"`)
    .join(", ")
    .replace(/,\s*$/, "");

  const formattedRelatedPosts = relatedPosts
    ? relatedPosts
        .split(",")
        .map((post) => `"${post.trim()}"`)
        .filter(Boolean)
    : [];

  const newFileContent = [
    "export const metadata = {",
    `  id: "${existingId || data.id}",`,
    `  type: "blog",`,
    `  title: "${title}",`,
    `  author: "${data.author}",`,
    `  publishDate: "${date}",`,
    `  description: "${data.description}",`,
    `  categories: [${formattedCategories}],`,
    `  tags: [${formattedTags}],`,
    `  modifiedDate: "${new Date().toISOString()}",`,
    `  image: ${image ? `"${image}"` : "null"},`,
    `  draft: ${draft},`,
    `  relatedPosts: [${formattedRelatedPosts.join(", ")}]`,
    "};",
    "",
    data.content || existingContentBody,
  ].join("\n");

  try {
    fs.writeFileSync(newFilePath, newFileContent);
    console.log("File saved to", newFilePath);

    if (originalFilename !== filename) {
      fs.unlinkSync(originalFilePath);
      console.log("Original file deleted:", originalFilePath);
    }

    await generatePostsCache();

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
      newSlug: filename.replace(".mdx", ""),
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
