import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="flex flex-col gap-8 max-w-xl">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">
        Download <span className="primary-color">MDX</span>Blog
      </h1>
      <p>
        Download MDX Blog Lite, which is a good starting point for a simple
        blog.
      </p>
      <Link
        className="text-lg"
        href="https://github.com/owolfdev/simple-mdx-blog"
        target="_blank"
      >
        <Button>
          <span className="text-lg">
            Download <span className="font-bold">MDX Blog</span> Lite
          </span>
        </Button>
      </Link>
      <p>
        Download MDX Blog, a full-feature version which features several helpful
        tools such as admin panel, and create / edit functions.
      </p>
      <Link
        className="text-lg"
        href="https://github.com/owolfdev/mdx-blog-basic"
        target="_blank"
      >
        <Button>
          <span className="text-lg">
            Download <span className="font-bold">MDX Blog</span>
          </span>
        </Button>
      </Link>
    </div>
  );
}
