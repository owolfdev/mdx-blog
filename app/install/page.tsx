import type { Metadata } from "next";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

// Define the metadata generation function
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MDX Blog | Install",
  };
}

export default function Install() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-6">
          Install <span className="primary-color">MDX</span>Blog
        </h1>
        <p>
          Install MDX Blog Latest Update, which is a good starting point for a
          simple blog or to learn how to build a blog with MDX and Next.js. This
          version uses @next/mdx package, the app router, and more.
        </p>
        <Link
          className="text-lg"
          href="https://github.com/owolfdev/next-template-mdx-shad"
          target="_blank"
        >
          <Button>
            <span className="text-lg">
              Install <span className="font-bold">MDX Blog</span> Latest
            </span>
          </Button>
        </Link>
        <hr />
        <p>
          Install MDX Blog Legacy, a more full-featured version, which offers
          several helpful tools such as admin panel, create / edit functions,
          and more. This version is a good starting point for a production app.
          Installation instructions are in the{" "}
          <Link
            target="_blank"
            href="https://github.com/owolfdev/mdx-blog/blob/main/README.md"
            className="font-bold"
          >
            README
          </Link>{" "}
          file. This version uses the next-mdx-remote package, the app router,
          and more.
        </p>
        <Link
          className="text-lg"
          href="https://github.com/owolfdev/mdx-blog-basic"
          target="_blank"
        >
          <Button>
            <span className="text-lg">
              Install <span className="font-bold">MDX Blog</span> Legacy
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
