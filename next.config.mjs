import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// Note: MDX plugins configuration may have issues with Turbopack in Next.js 16
// If you encounter serialization errors, you may need to use webpack instead
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [rehypeHighlight],
    format: "mdx",
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
