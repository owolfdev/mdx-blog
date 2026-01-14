import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import path from "node:path";

const remarkMdxToMd = () => {
  return (tree) => {
    const walk = (node) => {
      if (!node || typeof node !== "object") {
        return;
      }
      if (node.type === "code" && node.lang === "mdx") {
        node.lang = "md";
        const data = node.data ?? (node.data = {});
        const hProperties = data.hProperties ?? (data.hProperties = {});
        hProperties.className = ["language-md", "language-mdx-label"];
      }
      if (Array.isArray(node.children)) {
        node.children.forEach(walk);
      }
    };
    walk(tree);
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    domains: ["images.unsplash.com"],
    // or remotePatterns: [{ protocol: "https", hostname: "images.example.com" }],
  },
  // Configure webpack to resolve content and settings directories
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/content": path.join(process.cwd(), "content"),
      "@/settings": path.join(process.cwd(), "settings"),
    };
    return config;
  },
};

// Note: MDX plugins configuration may have issues with Turbopack in Next.js 16
// If you encounter serialization errors, you may need to use webpack instead
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxToMd],
    rehypePlugins: [rehypeHighlight],
    format: "mdx",
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
