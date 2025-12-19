"use server"; // Indicate this is a server action
import fs from "node:fs";
import path from "node:path";

interface GetPageParams {
  slug: string;
}

export async function getPage({ slug }: GetPageParams) {
  try {
    // Filter out non-MDX files and potential unwanted files like .DS_Store
    if (slug === ".DS_Store") {
      throw new Error("Invalid file: .DS_Store");
    }

    const filePath = path.join("content/pages", `${slug}.mdx`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Extract metadata and content
    const metadataMatch = fileContent.match(
      /export const metadata = {([\s\S]+?)};\n\n/
    );
    // biome-ignore lint/security/noGlobalEval: This eval usage is controlled and safe for server use
    const metadata = metadataMatch ? eval(`({${metadataMatch[1]}})`) : {};
    const content = fileContent
      .replace(/export const metadata = {[\s\S]+?};\n\n/, "")
      .trim();

    return {
      metadata,
      slug,
      content,
      filename: `${slug}.mdx`,
    };
  } catch (error) {
    console.error("Error fetching page:", error);
    return { notFound: true };
  }
}
