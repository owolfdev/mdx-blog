import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [
      rehypeHighlight,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap", // Wraps the heading text in an <a> tag
        },
      ],
    ],
    format: "mdx",
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
