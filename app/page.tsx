import LoaderLink from "@/components/nav/custom-link";
// import AbstractArt from "@/components/graphics/abstract-image";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4  max-w-xl">
      <h1 className="text-5xl sm:text-7xl font-bold text-center">
        Welcome to <span className="gradient-text">MDX</span>Blog
      </h1>
      <div className="flex justify-center">
        <p>A simple static blog template built with Next.js and MDX.</p>
      </div>
      <div className="flex justify-center py-3">
        <Button>
          <Link href="https://github.com/owolfdev/mdx-blog">
            <div className="text-lg">
              Install <span className="gradient-text">MDX</span>Blog
            </div>
          </Link>
        </Button>
      </div>
      <p>
        We regularly publish content, including articles, tutorials, and news
        covering MDX, Next.js, and other static site generation frameworks.
      </p>
      <div className="py-3">
        <LoaderLink isButton={true} url="/blog">
          Start Reading
        </LoaderLink>
      </div>
      <div className="flex justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          More About <span className="gradient-text">MDX</span>Blob
        </h2>
      </div>
      <ReactMarkdown className="flex flex-col gap-6">
        {heroContent}
      </ReactMarkdown>
    </div>
  );
}

const heroContent1 = `
**MDXBlog** offers a simple, yet powerful template for creating static blogs using **MDX** (Markdown + JSX) and **Next.js 14**.`;

const heroContent = `
**MDXBlog** offers a simple, yet powerful template for creating static blogs using **MDX** (Markdown + JSX) and **Next.js 14**.

**Why MDX?** MDX blends Markdown's straightforward syntax with the capability to embed dynamic JSX elements. Perfect for interactive, rich-content blogs.

**Get MDXBlog:** Download the [**repo**](https://github.com/owolfdev/mdx-blog). Instructions for installation and deployment are included in the README.

**Learn More About MDXBlog:**

- • [Documentation. AKA the 'about' page.](/about)
- • [MDXBlog GitHub Repo](https://github.com/owolfdev/mdx-blog)
- • [The Blog, where you can find the latest news and tutorials.](/blog)

**Learn More About MDX format**:
- • [MDX Official Documentation](https://mdxjs.com/)
- • [Integrating MDX with Next.js](https://nextjs.org/docs)
`;
