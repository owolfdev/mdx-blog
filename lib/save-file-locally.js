const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { generatePostsCache } = require("./posts-utils");

export function saveFileLocally(data) {
  const { savedFilename, title, categories, tags, ...rest } = data;
  const projectRoot = process.cwd();

  // console.log("savedFilename:", savedFilename);

  // Convert title to lowercase and replace spaces with hyphens
  let filename = `${title.toLowerCase().replace(/\s+/g, "-")}.mdx`;
  let slug = `${title.toLowerCase().replace(/\s+/g, "-")}`;

  // let filename = `${title.toLowerCase().replace(/\s+/g, "-")}.mdx`;
  let filePath = path.join(projectRoot, "data/posts", filename);

  // Check if the file already exists and create a unique filename
  let counter = 1;
  while (fs.existsSync(filePath)) {
    filename = `${title.toLowerCase().replace(/\s+/g, "-")}-${counter}.mdx`;
    filePath = path.join(projectRoot, "data/posts", filename); // Update filePath
    console.log("File already exists!!!!", counter);
    counter++;
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0]; // This will format the date as YYYY-MM-DD

  // Format categories and tags for YAML
  const formattedCategories = categories.map((cat) => `  - ${cat}`).join("\n");
  const formattedTags = tags
    .split(", ")
    .map((tag) => `  - ${tag.trim()}`)
    .join("\n");

  // Construct the file content
  let fileContent = `---
id: "${data.id}"
type: "${data.type}"
author: "${data.author}"
title: "${title}"
date: "${formattedDate}"
description: "${data.description}"
categories:
${formattedCategories}
tags:
${formattedTags}
image: "/images/default.jpg"
path: "${filename}"
---

${data.content}
`;

  console.log("File content:", fileContent);
  console.log("Project root:", projectRoot);

  // Write the file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
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
    }
  });

  return slug;
}

// Example usage
// saveFileLocally({
//   title: "8. Eighth blog post",
//   type: "blog",
//   description: "Blog post 8.",
//   content: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   categories: ["Development"],
//   tags: "react, nextjs"
// });
