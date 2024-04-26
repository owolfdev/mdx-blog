import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="flex flex-col gap-8 max-w-xl">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">
        Install <span className="primary-color">MDX</span>Blog
      </h1>
      <p>
        Install MDX Blog Lite, which is a good starting point for a simple blog
        or to learn how to build a blog with MDX and Next.js.
      </p>
      <Link
        className="text-lg"
        href="https://github.com/owolfdev/simple-mdx-blog"
        target="_blank"
      >
        <Button>
          <span className="text-lg">
            Install <span className="font-bold">MDX Blog</span> Lite
          </span>
        </Button>
      </Link>
      <hr />
      <p>
        Install MDX Blog, a more full-featured version, which offers several
        helpful tools such as admin panel, create / edit functions, and more.
        This version is a good starting point for a production app. Installation
        instructions are in the{" "}
        <Link
          target="_blank"
          href="https://github.com/owolfdev/mdx-blog/blob/main/README.md"
          className="font-bold"
        >
          README
        </Link>{" "}
        file.
      </p>
      <Link
        className="text-lg"
        href="https://github.com/owolfdev/mdx-blog-basic"
        target="_blank"
      >
        <Button>
          <span className="text-lg">
            Install <span className="font-bold">MDX Blog</span>
          </span>
        </Button>
      </Link>
    </div>
  );
}
