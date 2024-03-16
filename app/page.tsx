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
          <Link target="_blank" href="https://github.com/owolfdev/mdx-blog">
            <div className="text-lg">
              Install{" "}
              <span className="font-bold">
                <span className="gradient-text">MDX</span>Blog
              </span>
            </div>
          </Link>
        </Button>
      </div>
      <p>
        Click the button above ☝️ to go to the MDXBlog github repo. Installation
        instructions are in the{" "}
        <Link
          target="_blank"
          href="https://github.com/owolfdev/mdx-blog/blob/main/README.md"
        >
          README
        </Link>{" "}
        file.
      </p>
      <hr />
      <p>
        We regularly publish content, including articles, tutorials, and news
        covering MDX, Next.js, and other static site generation frameworks.
        Click the button below to start reading 👇.
      </p>
      <div className="py-3">
        <LoaderLink isButton={true} url="/blog">
          Start Reading
        </LoaderLink>
      </div>
      <hr />
      <div className="flex justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          More About <span className="gradient-text">MDX</span>Blog
        </h2>
      </div>
      <div>
        <span className="font-bold">MDXBlog</span> offers a simple, yet powerful
        template for creating static blogs using MDX (Markdown + JSX) and
        Next.js 14.
      </div>
      <div>
        <span className="font-bold">Why MDX?</span> MDX blends Markdown&apos;s
        straightforward syntax with the capability to embed dynamic JSX
        elements. Perfect for interactive, rich-content blogs.
      </div>
      <div>
        <span className="font-bold">Get MDXBlog</span>: Download the{" "}
        <Link target="_blank" href="https://github.com/owolfdev/mdx-blog">
          <span className="font-bold">github repo</span>
        </Link>
        . Instructions for installation and deployment are included in the
        README.
      </div>
      <div>
        <ul>
          <li>
            <Link href="/about">• Documentation.</Link>
          </li>
          <li>
            <Link target="_blank" href="https://github.com/owolfdev/mdx-blog">
              • MDXBlog GitHub Repo
            </Link>
          </li>
          <li>
            <Link href="/blog">
              • The Blog, where you can find the latest news and tutorials.
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className="flex justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          More About <span className="">MDX</span>
        </h2>
      </div>
      <div>
        <ul>
          <li>
            <Link target="_blank" href="https://mdxjs.com/">
              • MDX Official Documentation.
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://nextjs.org/docs">
              • Integrating MDX with Next.js
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
