"use server";

import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { v4 as uuidv4 } from "uuid";
import { generatePostsCache } from "@/app/actions/cache/generate-posts-cache";

const POLLING_INTERVAL = 100; // Check every 100ms
const MAX_POLLING_TIME = 5000; // Timeout after 5 seconds

function waitForFile(
  filePath: fs.PathLike,
  interval = POLLING_INTERVAL,
  maxTime = MAX_POLLING_TIME
): Promise<boolean> {
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

export interface CreatePostData {
  id: string;
  modifiedDate: string;
  date: string; // Ensure date is a string
  type: string;
  title: string;
  description: string;
  content: string;
  categories: string[];
  tags?: string;
  image?: string | null;
  relatedPosts?: string;
  draft?: boolean;
  author: string;
  link?: string;
}

export async function createNewPostAction(
  data: CreatePostData
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const { date, title, categories, tags, image, draft, relatedPosts } = data;
    const projectRoot = process.cwd();

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    let filename = `${slug}.mdx`;
    let filePath = path.join(projectRoot, "content/posts", filename);

    let counter = 1;
    let finalSlug = slug;
    while (fs.existsSync(filePath)) {
      finalSlug = `${slug}-${counter}`;
      filename = `${finalSlug}.mdx`;
      filePath = path.join(projectRoot, "content/posts", filename);
      counter++;
    }

    const currentDate = new Date(date);
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    const id = uuidv4();

    const formattedTags = tags
      ? tags
          .split(", ")
          .map((tag) => `"${tag.trim()}"`)
          .join(", ")
          .replace(/,\s*$/, "")
      : "";

    const formattedCategories = categories
      .map((category) => `"${category}"`)
      .join(", ")
      .replace(/,\s*$/, "");

    const formattedRelatedPosts = relatedPosts
      ? relatedPosts.split(",").map((post) => `"${post.trim()}"`)
      : [];

    const fileContent = [
      "export const metadata = {",
      `  id: "${id}",`,
      `  type: "${data.type}",`,
      `  title: "${title}",`,
      `  author: "${data.author}",`,
      `  publishDate: "${formattedDate}",`,
      `  description: "${data.description}",`,
      `  categories: [${formattedCategories}],`,
      `  tags: [${formattedTags}],`,
      `  modifiedDate: "${new Date().toISOString()}",`,
      `  image: ${image ? `"${image}"` : "null"},`,
      `  draft: ${draft},`,
      `  relatedPosts: [${formattedRelatedPosts.join(", ")}]`,
      "};",
      "",
      `${data.content}`,
    ].join("\n");

    fs.writeFile(filePath, fileContent, async (err) => {
      if (err) {
        console.error("Error writing file:", err);
        reject(err);
      } else {
        console.log("File saved to", filePath);

        generatePostsCache();

        try {
          await waitForFile(filePath);

          exec(`cursor "${filePath}"`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
          });

          resolve(finalSlug);
        } catch (waitError) {
          console.error("Error waiting for file:", waitError);
          reject(waitError);
        }
      }
    });
  });
}
