import LoaderLink from "@/components/nav/loader-link";
// import AbstractArt from "@/components/graphics/abstract-image";
import ReactMarkdown from "react-markdown";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center align-middle items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-center">
        Welcome to <span className="gradient-text">MDX</span>Blog
      </h1>
      <p className="text-center">
        This is a simple blog built with Next.js and MDX.
      </p>
      <LoaderLink isButton={true} url="/blog">
        Start Reading
      </LoaderLink>
      <ReactMarkdown className="flex flex-col gap-6">
        {heroContent}
      </ReactMarkdown>
    </div>
  );
}

const heroContent = `
**MDXBlog** offers a simple, yet powerful template for creating blogs using **MDX** (Markdown + JSX) and **Next.js 14**.

**Why MDX?** MDX blends Markdown's straightforward syntax with the capability to embed dynamic JSX elements. Perfect for interactive, rich-content blogs.

**Get MDXBlog:** Download the [**repo**](https://github.com/owolfdev/mdx-blog). Instructions for installation and deployment are included in the README.

**Learn More About MDXBlog:**

- • [MDXBlog Official Documentation. AKA the 'about' page.](/about)
- • [MDXBlog GitHub Repo](https://github.com/owolfdev/mdx-blog)
- • [The Blog, where you can find the latest news and tutorials](/blog)

**Learn More About MDX format**:
- • [MDX Official Documentation](https://mdxjs.com/)
- • [Integrating MDX with Next.js](https://nextjs.org/docs)
`;
