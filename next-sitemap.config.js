// next-sitemap.js
module.exports = {
  siteUrl: "https://www.mdxblog.io", // Replace with your site URL
  generateRobotsTxt: true, // Optional, but recommended for SEO
  sitemapSize: 7000, // The maximum number of URLs per sitemap file
};

// /** @type {import('next-sitemap').IConfig} */

// module.exports = {
//   siteUrl: "https://www.mdxblog.io",
//   generateRobotsTxt: true, // (optional)
//   exclude: [
//     "/blog/.DS_Store",
//     "/blog/README.md",
//     "/blog/create",
//     "/apple-icon.png",
//     "/settings",
//     "/contact",
//     "/contact/thank-you",
//     "/privacy",
//     // "/api/get-contact-messages", // Exclude API page
//     // "/api/get-posts", // Exclude API page
//     "/contact/messages", // Exclude specific route
//     "/profile", // Exclude specific route
//   ],
//   // ...other options
// };
