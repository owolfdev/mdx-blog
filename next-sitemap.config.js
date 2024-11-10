// next-sitemap.config.js
const fs = require("node:fs").promises;
const path = require("node:path");

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://www.mdxblog.io/",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    "/api/*",
    "/auth/*",
    "/(auth-pages)/*",
    "/admin/*",
    "/actions/*",
    "/post/create/*",
    "/post/edit/*",
    "/page/create/*",
    "/page/edit/*",
    "/*.png",
    "/*.jpg",
    "/*.ico",
    "/favicon.ico",
    "/apple-icon.png",
    "/not-found",
    "/loading",
    "/error",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/*",
          "/auth/*",
          "/admin/*",
          "/post/create/*",
          "/post/edit/*",
          "/page/create/*",
          "/page/edit/*",
        ],
      },
    ],
  },
  outDir: "public",
  additionalPaths: async (config) => {
    const result = [];

    // Add static routes
    const staticRoutes = [
      "/",
      "/about",
      "/blog",
      "/contact",
      "/contact/thank-you",
      "/install",
      "/privacy",
    ];

    for (const route of staticRoutes) {
      result.push({
        loc: route,
        changefreq: "daily",
        priority: route === "/" ? 1.0 : 0.7,
        lastmod: new Date().toISOString(),
      });
    }

    // Read blog posts from the content directory
    try {
      // Adjust this path to match your blog posts location
      const contentDir = path.join(process.cwd(), "content", "posts");
      const files = await fs.readdir(contentDir);

      // Add each blog post to the sitemap
      for (const file of files) {
        if (file.endsWith(".mdx") || file.endsWith(".md")) {
          const slug = file.replace(/\.mdx?$/, "");
          result.push({
            loc: `/blog/${slug}`,
            changefreq: "daily",
            priority: 0.7,
            lastmod: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      console.warn(
        "Warning: Could not read blog posts directory:",
        error.message
      );
    }

    return result;
  },
};

module.exports = config;
