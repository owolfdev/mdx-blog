"use server";

import fs from "node:fs";
import path from "node:path";
import { requireAdminUser } from "@/lib/utils/require-admin";

export async function createNewPageAction(data: {
  title: string;
  description: string;
  content: string;
}) {
  await requireAdminUser();
  return new Promise<string>((resolve, reject) => {
    const projectRoot = process.cwd();

    // Generate a slug by sanitizing the title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    let filename = `${slug}.mdx`;
    let filePath = path.join(projectRoot, "content/pages", filename);

    // Ensure unique filename if it already exists
    let counter = 1;
    let finalSlug = slug;
    while (fs.existsSync(filePath)) {
      finalSlug = `${slug}-${counter}`;
      filename = `${finalSlug}.mdx`;
      filePath = path.join(projectRoot, "content/pages", filename);
      counter++;
    }

    // Generate the content for the MDX file
    const fileContent = `
export const metadata = {
  slug: "${finalSlug}",
  title: "${data.title}",
  description: "${data.description}",
  modifiedDate: "${new Date().toISOString()}",
};

${data.content}
    `;

    // Write the MDX file
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        reject(err);
        return;
      }

      // Create a new route folder in /app
      const routeDir = path.join(projectRoot, "app", finalSlug);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir);
      }

      // Create the page.tsx file in the new route with isDevMode check
      const routeFilePath = path.join(routeDir, "page.tsx");
      const routeFileContent = `
import React from "react";
import EditPageButton from "@/components/page/edit-page-button";
import OpenInCursor from "@/components/page/open-page-in-cursor-button";
import { isDevMode } from "@/lib/utils/is-dev-mode";

// Dynamically import the MDX content
async function loadMdxFile() {
  const mdxModule = await import("@/content/pages/${finalSlug}.mdx");
  return mdxModule;
}

export default async function Page() {
  const mdxModule = await loadMdxFile();
  if (!mdxModule) {
    return <p>Page not found</p>;
  }

  const { default: Content, metadata } = mdxModule;

  return (
    <div className="flex flex-col max-w-3xl w-full gap-8 pt-10">
      <h1 className="text-6xl font-black">{metadata.title}</h1>
      {isDevMode() && (
        <div className="flex gap-3">
          <EditPageButton slug={metadata.slug} />
          <OpenInCursor path={metadata.slug} />
        </div>
      )}
      <article className="prose prose-lg mx-auto w-full">
        <Content />
      </article>
    </div>
  );
}
      `;

      fs.writeFile(routeFilePath, routeFileContent, (routeErr) => {
        if (routeErr) {
          console.error("Error creating route file:", routeErr);
          reject(routeErr);
        } else {
          console.log("Route created at", routeFilePath);
          resolve(finalSlug);
        }
      });
    });
  });
}
