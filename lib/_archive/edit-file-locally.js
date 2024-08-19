const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("node:child_process");
const { generatePostsCache } = require("./posts-utils");

export function editFileLocally(data, openInVSCode = false) {
  const { date, title, categories, tags, filename, slug, ...rest } = data;
  const projectRoot = process.cwd();
  const targetFile = filename || `${slug}.mdx`; // Use filename or slug to determine the target file
  const filePath = path.join(projectRoot, "content/posts", targetFile);

  if (!fs.existsSync(filePath)) {
    console.error("File does not exist:", filePath);
    throw new Error(`File does not exist: ${filePath}`);
  }

  // Read the existing file content
  let existingContent = fs.readFileSync(filePath, "utf8");

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
    .map((tag) => `"${tag.trim()}"`)
    .join(", ");

  // Format categories for metadata
  const formattedCategories = categories
    .map((category) => `"${category}"`)
    .join(", ");

  // Construct the new file content
  let newFileContent = [
    `export const metadata = {`,
    `  id: "${existingId || data.id}",`, // Preserve existing ID or use the provided ID
    `  type: "blog",`,
    `  title: "${title}",`,
    `  author: "${data.author}",`,
    `  publishDate: "${date}",`,
    `  description: "${data.description}",`,
    `  category: [${formattedCategories}],`,
    `  tags: [${formattedTags}]`,
    `};`,
    ``,
    `${data.content || existingContentBody}`,
  ].join("\n");

  // Write the updated file content
  fs.writeFile(filePath, newFileContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File saved to", filePath);

      // Regenerate posts cache
      generatePostsCache();

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
    }
  });
}
