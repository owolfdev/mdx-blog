import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation"; // Import notFound function
import type { Post } from "@/types/post-types";

export async function getPost({ slug }: { slug: string }): Promise<Post> {
  try {
    if (slug === ".DS_Store") {
      throw new Error("Invalid file: .DS_Store");
    }

    const filePath = path.join("content/posts", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      notFound(); // Trigger 404 if the file doesn't exist
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");

    const metadataMatch = fileContent.match(
      /export const metadata = {([\s\S]+?)};\n\n/
    );
    if (!metadataMatch) {
      notFound(); // Trigger 404 if metadata is not found
    }

    // biome-ignore lint/security/noGlobalEval: <explanation>
    const metadata = eval(`({${metadataMatch[1]}})`);
    const content = fileContent
      .replace(/export const metadata = {[\s\S]+?};\n\n/, "")
      .trim();

    return {
      metadata, // This contains all the fields like id, title, etc.
      slug,
      content,
      filename: `${slug}.mdx`,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound(); // Trigger 404 in case of any errors
  }
}
