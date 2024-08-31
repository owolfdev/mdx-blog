import type { Metadata } from "next";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

// Define the metadata generation function
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MDXBlog | Install",
  };
}

export default function Install() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-8 text-lg">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-6">
          Install <span className="primary-color">MDX</span>Blog
        </h1>
        <p>
          Install MDXBlog Basic, a more spare and stable version of the
          codebase, which is a good starting point for a simple blog or to learn
          how to build a blog with MDX and Next.js. This version uses the
          @next/mdx package, the app router, and more.{" "}
          <span className="primary-color">RECOMMENDED!</span>
        </p>
        <Link
          className="text-lg"
          href="https://github.com/owolfdev/next-template-mdx-shad"
          target="_blank"
        >
          <Button>
            <span className="text-lg">
              Install <span className="font-bold">MDXBlog</span> Basic
            </span>
          </Button>
        </Link>
        <hr className="w-full" />
        <p>
          Install MDXBlog, this site&apos;s codebase, including all the content,
          all the tools we use daily, as well as any issues that we are working
          to improve. This is the evolving template, and the latest version of
          the MDXBlog. This version currently uses the @next/mdx package, the
          app router, and more.
        </p>
        <Link
          className="text-lg"
          href="https://github.com/owolfdev/mdx-blog"
          target="_blank"
        >
          <Button>
            <span className="text-lg">
              Install <span className="font-bold">MDXBlog</span> Latest
            </span>
          </Button>
        </Link>
        <hr className="w-full" />
        <p>
          Install MDXBlog Legacy, a full-featured version, which offers several
          helpful tools such as admin panel, create / edit functions, and more.
          This is a good starting point for a production app. This version uses
          the next-mdx-remote package, the app router, and more.
        </p>
        <Link
          className="text-lg"
          href="https://github.com/owolfdev/mdx-blog-basic"
          target="_blank"
        >
          <Button>
            <span className="text-lg">
              Install <span className="font-bold">MDXBlog</span> Legacy
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
