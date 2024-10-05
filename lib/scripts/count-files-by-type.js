const fs = require("fs");
const path = require("path");

const directoryPath =
  "/Users/wolf/Documents/Development/Projects/MDX_blog/mdx-blog/content/posts"; // Change this to your directory

// Initialize an object to hold the count of each type
const typeCounts = {};

// Function to process files
const processFiles = () => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.error(`Unable to scan directory: ${err}`);
    }

    let totalFiles = 0;

    // Loop through all the files in the directory
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      // Read the file content
      const content = fs.readFileSync(filePath, "utf8");

      // Use regex to extract the metadata object
      const metadataMatch = content.match(
        /export\s+const\s+metadata\s+=\s+({[\s\S]*?});/
      );

      if (metadataMatch) {
        totalFiles++;
        // Parse the metadata object
        const metadata = eval("(" + metadataMatch[1] + ")");

        // Count the type
        if (metadata.type) {
          if (typeCounts[metadata.type]) {
            typeCounts[metadata.type]++;
          } else {
            typeCounts[metadata.type] = 1;
          }
        }
      }
    });

    // Log the counts and total files
    console.log("Type Counts:", typeCounts);
    console.log("Total Files:", totalFiles);
  });
};

// Run the script
processFiles();
