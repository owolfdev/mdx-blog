"use server";

import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { generatePostsCache } from "@/lib/cache/generate-posts-cache.mjs";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function editPostAction(data: any, openInVSCode = false) {
  const { date, title, categories, tags, filename, slug, ...rest } = data;
  const projectRoot = process.cwd();
  const targetFile = filename || `${slug}.mdx`; // Use filename or slug to determine the target file
  const filePath = path.join(projectRoot, "content/posts", targetFile);

  if (!fs.existsSync(filePath)) {
    console.error("File does not exist:", filePath);
    throw new Error(`File does not exist: ${filePath}`);
  }

  // Read the existing file content
  const existingContent = fs.readFileSync(filePath, "utf8");

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
    .join(", ");

  // Format categories for metadata
  const formattedCategories = categories
    .map((category: string) => `"${category}"`)
    .join(", ");

  // Construct the new file content
  // biome-ignore lint/style/useConst: <explanation>
  let newFileContent = [
    "export const metadata = {",
    `  id: "${existingId || data.id}",`, // Preserve existing ID or use the provided ID
    `  type: "blog",`,
    `  title: "${title}",`,
    `  author: "${data.author}",`,
    `  publishDate: "${date}",`,
    `  description: "${data.description}",`,
    `  category: [${formattedCategories}],`,
    `  tags: [${formattedTags}]`,
    "};",
    "",
    `${data.content || existingContentBody}`,
  ].join("\n");

  // Write the updated file content
  try {
    fs.writeFileSync(filePath, newFileContent);
    console.log("File saved to", filePath);

    // Regenerate posts cache
    await generatePostsCache();

    // Conditionally open the file in VS Code
    if (openInVSCode) {
      exec(`code "${filePath}"`, (error, stdout, stderr) => {
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
