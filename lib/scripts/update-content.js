const fs = require("node:fs");
const path = require("node:path");

function updateCategoryField(directoryPath) {
  // Read all files in the directory
  const files = fs.readdirSync(directoryPath);

  //   console.log(files);

  // biome-ignore lint/complexity/noForEach: <explanation>
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // Check if the file is an MDX file
    if (path.extname(file) === ".mdx") {
      // Read the content of the file
      let content = fs.readFileSync(filePath, "utf-8");

      // Replace "category:" with "categories:"
      if (content.includes("category:")) {
        content = content.replace(/category:/g, "categories:");

        // Save the updated content back to the file
        fs.writeFileSync(filePath, content, "utf-8");
        console.log(`Updated ${file}`);
      } else {
        console.log(`No category field found in ${file}`);
      }
    }
  });
}

// Usage: updateCategoryField('/path/to/your/mdx/files');
updateCategoryField(
  "/Users/wolf/Documents/Development/Projects/MDX_blog/mdx-blog/content/posts"
);
