import fs from "node:fs";
import path from "node:path";
import React from "react";
import type { Metadata } from "next";
import MdxContent from "./mdx-content";

export async function generateMetadata(): Promise<Metadata> {
  const filePath = path.join(process.cwd(), "content/pages/about.mdx");
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Use a regular expression to extract the metadata object
  const metadataMatch = fileContent.match(
    /export\s+const\s+metadata\s+=\s+({[\s\S]*?});/
  );

  if (metadataMatch?.[1]) {
    // Parse the metadata object string into an actual object
    // biome-ignore lint/security/noGlobalEval: <explanation>
    const metadata = eval(`(${metadataMatch[1]})`);

    return {
      title: metadata.title,
      description: metadata.description,
    };
  }
  throw new Error("Metadata not found in the MDX file.");
}

export default function About() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          About <span className="primary-color">MDX</span>Blog
        </h1>
        <MdxContent slug="about" />
      </div>
    </div>
  );
}
