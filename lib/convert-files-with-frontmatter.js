const fs = require("fs-extra");
const path = require("node:path");
const matter = require("gray-matter");

const inputDir = path.join(__dirname, "../data/posts"); // Change this to your input directory
const outputDir = path.join(__dirname, "../data/posts-with-metadata");

function generateMetadataString(metadata) {
  const metadataEntries = Object.entries(metadata)
    .map(([key, value]) => {
      const formattedValue = Array.isArray(value)
        ? `[${value.map((v) => `"${v}"`).join(", ")}]`
        : `"${value}"`;
      return `${key}: ${formattedValue}`;
    })
    .join(",\n  ");

  return `export const metadata = {\n  ${metadataEntries}\n};\n\n`;
}

async function convertFrontmatterToMetadata(inputFile, outputDir) {
  try {
    const fileContent = await fs.readFile(inputFile, "utf8");
    const { data: frontmatter, content } = matter(fileContent);

    const metadata = {
      type: frontmatter.type || "",
      title: frontmatter.title || "",
      author: frontmatter.author || "",
      publishDate: frontmatter.date || "",
      description: frontmatter.description || "",
      category: frontmatter.categories ? frontmatter.categories[0] : "",
      tags: frontmatter.tags || [],
    };

    const metadataContent = generateMetadataString(metadata) + content;

    const outputFileName = `${path.basename(
      frontmatter.path || inputFile,
      ".mdx"
    )}.mdx`;
    const outputPath = path.join(outputDir, outputFileName);

    await fs.ensureDir(outputDir);
    await fs.writeFile(outputPath, metadataContent, "utf8");

    console.log(`Converted and saved: ${outputPath}`);
  } catch (error) {
    console.error("Error converting frontmatter:", error);
  }
}

async function convertAllFilesInDirectory(inputDir, outputDir) {
  try {
    const files = await fs.readdir(inputDir);
    const mdxFiles = files.filter((file) => path.extname(file) === ".mdx");

    for (const file of mdxFiles) {
      const inputFilePath = path.join(inputDir, file);
      await convertFrontmatterToMetadata(inputFilePath, outputDir);
    }

    console.log("All files processed.");
  } catch (error) {
    console.error("Error processing directory:", error);
  }
}

convertAllFilesInDirectory(inputDir, outputDir);
