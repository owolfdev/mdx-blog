/** @type {import('next-sitemap').IConfig} */
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  siteUrl: "https://www.mdxblog.io",
  generateRobotsTxt: true,
  exclude: [
    "/blog/.DS_Store",
    "/blog/README.md",
    "/blog/create",
    "/apple-icon.png",
    "/settings",
    "/contact",
    "/contact/thank-you",
    "/privacy",
    "/contact/messages",
    "/profile",
  ],
  transform: async (config, path) => {
    const postPath = path.startsWith("/blog/")
      ? path.replace("/blog/", "")
      : null;

    if (postPath) {
      const fullPath = path.resolve(
        __dirname,
        `../content/posts/${postPath}.mdx`
      );
      if (fs.existsSync(fullPath)) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { publishDate } = extractMetadata(fileContent); // Implement a function to extract metadata

        const currentDate = new Date();
        const postDate = new Date(publishDate);

        if (postDate > currentDate) {
          return null; // Exclude this post from the sitemap
        }
      }
    }

    return {
      loc: path, // Use the default transformation
      changefreq: "daily",
      priority: 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  // ...other options
};

// Implement this function to extract metadata like publishDate from the file content
function extractMetadata(fileContent) {
  const metadata = {};
  // Logic to extract publishDate from the MDX content
  // This could be as simple as a regex, depending on how your metadata is formatted.
  return metadata;
}
