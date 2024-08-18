/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://www.mdxblog.io",
  generateRobotsTxt: true, // (optional)
  exclude: [
    "/blog/.DS_Store",
    "/blog/README.md",
    "/blog/create",
    "/apple-icon.png",
    "/settings",
    "/contact",
    "/contact/thank-you",
    "/privacy",
  ],
  // ...other options
};
