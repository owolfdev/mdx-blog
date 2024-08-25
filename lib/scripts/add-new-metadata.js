const fs = require("node:fs");
const path = require("node:path");

// Directory containing the MDX files
const directoryPath = path.join(__dirname, "../../content/posts"); // Replace 'your-folder-path' with the actual folder path

// Metadata to be added
const newMetadata = `
  modifiedDate: "2024-08-23",
  image: null,
  draft: false,
  relatedPosts: []
`;

// Function to add metadata to a file
function addMetadataToFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    // Find the metadata object within the file
    const metadataStart = data.indexOf("export const metadata = {");
    if (metadataStart === -1) {
      console.warn(`No metadata object found in file ${filePath}`);
      return;
    }

    // Find the end of the metadata object
    const metadataEnd = data.indexOf("};", metadataStart);
    if (metadataEnd === -1) {
      console.warn(`Incomplete metadata object in file ${filePath}`);
      return;
    }

    // Insert new metadata before the end of the metadata object
    const updatedData =
      data.slice(0, metadataEnd) + newMetadata + data.slice(metadataEnd);

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedData, "utf8", (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(`Updated metadata in file ${filePath}`);
      }
    });
  });
}

// Process each file in the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // biome-ignore lint/complexity/noForEach: <explanation>
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (path.extname(file) === ".mdx") {
      addMetadataToFile(filePath);
    }
  });
});
