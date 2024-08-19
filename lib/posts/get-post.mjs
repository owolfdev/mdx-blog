import fs from "node:fs";
import path from "node:path";

export async function getPost({ slug }) {
  try {
    // Filter out .DS_Store and other non-MDX files
    if (slug === ".DS_Store") {
      throw new Error("Invalid file: .DS_Store");
    }

    const filePath = path.join("content/posts", `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Extract metadata and content
    const metadataMatch = fileContent.match(
      /export const metadata = {([\s\S]+?)};\n\n/
    );
    // biome-ignore lint/security/noGlobalEval: <explanation>
    const metadata = metadataMatch ? eval(`({${metadataMatch[1]}})`) : {};
    const content = fileContent
      .replace(/export const metadata = {[\s\S]+?};\n\n/, "")
      .trim();

    return {
      metadata, // Change from frontMatter to metadata
      slug,
      content,
      filename: `${slug}.mdx`, // Add the filename
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
}
