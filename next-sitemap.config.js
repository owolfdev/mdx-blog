const fs = require("node:fs");
const path = require("node:path");

/** @type {import('next-sitemap').IConfig} */
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
  transform: async (config, url) => {
    const postPath = url.startsWith("/blog/")
      ? url.replace("/blog/", "")
      : null;

    if (postPath) {
      const fullPath = path.resolve(
        __dirname,
        `../content/posts/${postPath}.mdx`
      );
      if (fs.existsSync(fullPath)) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const metadata = extractMetadata(fileContent);

        if (metadata?.publishDate) {
          const currentDate = new Date();
          const postDate = new Date(metadata.publishDate);

          // Exclude post if its publish date is in the future
          if (postDate > currentDate) {
            return null;
          }
        }
      }
    }

    // Default transformation for valid posts
    return {
      loc: url,
      changefreq: "daily",
      priority: 0.7,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  // ...other options
};

// Function to extract metadata from the MDX file content
function extractMetadata(fileContent) {
  const metadataPattern = /export\s+const\s+metadata\s+=\s+({[\s\S]*?});/;
  const match = fileContent.match(metadataPattern);

  if (match?.[1]) {
    // Safely evaluate the metadata object
    try {
      // biome-ignore lint/security/noGlobalEval: <explanation>
      return eval(`(${match[1]})`);
    } catch (e) {
      console.error("Failed to parse metadata:", e);
      return null;
    }
  }

  return null;
}
