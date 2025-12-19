"use server";

import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

export async function editPageAction(
  data: {
    slug: string;
    title: string;
    description: string;
    originalFilename: string;
    filename: string;
    content: string;
  },
  openInVSCode = false
) {
  const { slug, title, description, originalFilename, filename, content } =
    data;

  const projectRoot = process.cwd();
  const originalFilePath = path.join(
    projectRoot,
    "content/pages",
    originalFilename
  );
  const newFilePath = path.join(projectRoot, "content/pages", filename);

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
        "A page with this slug already exists. Please choose a different slug.",
    };
  }

  // Read the existing file content
  const existingContent = fs.readFileSync(originalFilePath, "utf8");

  // Extract existing content (excluding metadata)
  const contentMatch = existingContent.match(
    /export const metadata = {[\s\S]+};\n\n([\s\S]*)/
  );
  const existingContentBody = contentMatch ? contentMatch[1] : "";

  // Construct the new file content
  const newFileContent = [
    "export const metadata = {",
    `  slug: "${slug}",`, // Add the slug field to the metadata
    `  title: "${title}",`,
    `  description: "${description}",`,
    `  modifiedDate: "${new Date().toISOString()}",`, // Update the modifiedDate
    "};",
    "",
    content || existingContentBody,
  ].join("\n");

  // Write the updated file content to the new file path
  try {
    fs.writeFileSync(newFilePath, newFileContent);
    console.log("File saved to", newFilePath);

    // If the filename has changed, delete the original file
    if (originalFilename !== filename) {
      fs.unlinkSync(originalFilePath);
      console.log("Original file deleted:", originalFilePath);
    }

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
