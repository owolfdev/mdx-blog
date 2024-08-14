const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("node:child_process");
const { generatePostsCache } = require("./posts-utils");
const shortUUID = require("short-uuid");

export function saveFileLocally(data) {
  return new Promise((resolve, reject) => {
    const { date, savedFilename, title, categories, tags, ...rest } = data;
    const projectRoot = process.cwd();

    // Sanitize the title to remove special characters and replace spaces with hyphens
    let filename = `${title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")}.mdx`;
    const slug = `${title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")}`;

    let filePath = path.join(projectRoot, "content/posts", filename);

    // Check if the file already exists and create a unique filename
    let counter = 1;
    while (fs.existsSync(filePath)) {
      filename = `${title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")}-${counter}.mdx`;
      filePath = path.join(projectRoot, "content/posts", filename); // Update filePath
      counter++;
    }

    const currentDate = new Date(data.date);
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    // Generate a short UUID for the id field
    const id = shortUUID.generate();

    // Format tags and categories for metadata
    const formattedTags = tags
      .split(", ")
      .map((tag) => `"${tag.trim()}"`)
      .join(", ");

    const formattedCategories = categories
      .map((category) => `"${category}"`)
      .join(", ");

    // Construct the file content
    const fileContent = [
      "export const metadata = {",
      `  id: "${id}",`, // Added id field
      `  type: "blog",`,
      `  title: "${title}",`,
      `  author: "${data.author}",`,
      `  publishDate: "${formattedDate}",`,
      `  description: "${data.description}",`,
      `  category: [${formattedCategories}],`,
      `  tags: [${formattedTags}]`,
      "};",
      "",
      `${data.content}`,
    ].join("\n");

    // Write the file
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        reject(err);
      } else {
        console.log("File saved to", filePath);

        // Regenerate posts cache
        generatePostsCache();

        // Open the file in VS Code
        exec(`code "${filePath}"`, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.error(`stderr: ${stderr}`);
        });

        resolve(slug);
      }
    });
  });
}
