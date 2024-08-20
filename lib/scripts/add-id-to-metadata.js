const fs = require("node:fs");
const path = require("node:path");
const shortUUID = require("short-uuid");

// Initialize the ShortUUID generator
const translator = shortUUID();

// Path to the folder containing MDX files
const mdxFolderPath = path.join(__dirname, "../../content/posts"); // Adjusted for your folder structure

// Function to process each MDX file
function addIdToMetadata(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Regular expression to match the first metadata object
    const metadataMatch = fileContent.match(
      /export\s+const\s+metadata\s+=\s+\{[\s\S]*?\}/m
    );

    if (metadataMatch && !metadataMatch[0].includes("id:")) {
      // Generate a short UUID
      const id = translator.generate();

      // Insert the id into the metadata object
      const updatedMetadata = metadataMatch[0].replace(
        "{",
        `{\n  id: "${id}",`
      );

      // Replace the original metadata with the updated metadata
      const updatedContent = fileContent.replace(
        metadataMatch[0],
        updatedMetadata
      );

      // Write the updated content back to the file
      fs.writeFileSync(filePath, updatedContent, "utf-8");
      console.log(`Added id to ${filePath}`);
    } else {
      console.log(
        `Skipping ${filePath}, id already exists or no metadata found.`
      );
    }
  } catch (error) {
    console.error(`Failed to process ${filePath}:`, error.message);
  }
}

// Function to iterate through all MDX files in the folder
function processMdxFiles(folderPath) {
  // biome-ignore lint/complexity/noForEach: <explanation>
  fs.readdirSync(folderPath).forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (path.extname(file) === ".mdx") {
      addIdToMetadata(filePath);
    }
  });
}

// Process the MDX files in the specified folder
processMdxFiles(mdxFolderPath);
