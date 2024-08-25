"use server";

import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import shortUUID from "short-uuid";
import { generatePostsCache } from "@/lib/cache/generate-posts-cache.mjs";

const POLLING_INTERVAL = 100; // Check every 100ms
const MAX_POLLING_TIME = 5000; // Timeout after 5 seconds

function waitForFile(
  filePath: fs.PathLike,
  interval = POLLING_INTERVAL,
  maxTime = MAX_POLLING_TIME
) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function checkFile() {
      if (fs.existsSync(filePath)) {
        resolve(true);
      } else if (Date.now() - startTime > maxTime) {
        reject(new Error("File was not saved in time."));
      } else {
        setTimeout(checkFile, interval);
      }
    }

    checkFile();
  });
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createNewPostAction(data: any) {
  return new Promise<string>((resolve, reject) => {
    const {
      date,
      title,
      categories,
      tags,
      image,
      draft,
      relatedPosts,
      ...rest
    } = data;
    const projectRoot = process.cwd();

    // Generate a slug by sanitizing the title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    let filename = `${slug}.mdx`;
    let filePath = path.join(projectRoot, "content/posts", filename);

    // Check if the file already exists and create a unique filename
    let counter = 1;
    let finalSlug = slug; // To keep track of the final slug for redirection
    while (fs.existsSync(filePath)) {
      finalSlug = `${slug}-${counter}`;
      filename = `${finalSlug}.mdx`;
      filePath = path.join(projectRoot, "content/posts", filename); // Update filePath
      counter++;
    }

    const currentDate = new Date(date);
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    // Generate a short UUID for the id field
    const id = shortUUID.generate();

    // Format tags and categories for metadata
    const formattedTags = tags
      .split(", ")
      .map((tag: string) => `"${tag.trim()}"`)
      .join(", ")
      .replace(/,\s*$/, ""); // Remove trailing comma

    const formattedCategories = categories
      .map((category: string) => `"${category}"`)
      .join(", ")
      .replace(/,\s*$/, ""); // Remove trailing comma

    // Format relatedPosts as an array of strings
    const formattedRelatedPosts = relatedPosts
      .map((post: string) => `"${post.trim()}"`)
      .join(", ");

    // Construct the file content
    const fileContent = [
      "export const metadata = {",
      `  id: "${id}",`,
      `  type: "blog",`,
      `  title: "${title}",`,
      `  author: "${data.author}",`,
      `  publishDate: "${formattedDate}",`,
      `  description: "${data.description}",`,
      `  category: [${formattedCategories}],`,
      `  tags: [${formattedTags}],`,
      `  modifiedDate: "${new Date().toISOString()}",`, // Automatically set modifiedDate to current date
      `  image: ${image ? `"${image}"` : "null"},`,
      `  draft: ${draft},`,
      `  relatedPosts: [${formattedRelatedPosts}]`,
      "};",
      "",
      `${data.content}`,
    ].join("\n");

    // Write the file
    fs.writeFile(filePath, fileContent, async (err) => {
      if (err) {
        console.error("Error writing file:", err);
        reject(err);
      } else {
        console.log("File saved to", filePath);

        // Regenerate posts cache
        generatePostsCache();

        try {
          // Wait for the file to be fully accessible
          await waitForFile(filePath);

          // Open the file in VS Code
          exec(`code "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
          });

          resolve(finalSlug); // Return the finalSlug for redirection
        } catch (waitError) {
          console.error("Error waiting for file:", waitError);
          reject(waitError);
        }
      }
    });
  });
}
