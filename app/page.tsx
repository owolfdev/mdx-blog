// import LoaderLink from "@/components/nav/custom-link";
// import AbstractArt from "@/components/graphics/abstract-image";
// import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4  max-w-xl">
      <h1 className="text-5xl sm:text-7xl font-bold text-center">
        Welcome to <span className="primary-color">MDX</span>Blog
      </h1>
      <div className="flex justify-center">
        <p>
          A simple static blog template built with{" "}
          <Link
            className="font-bold"
            href="https://nextjs.org/docs/app/building-your-application/configuring/mdx"
          >
            Next.js
          </Link>{" "}
          and{" "}
          <Link className="font-bold" href="https://mdxjs.com">
            MDX
          </Link>
          .
        </p>
      </div>
      <div className="flex justify-center py-3">
        <Link href="/install">
          <Button>
            <div className="text-lg">
              Install{" "}
              <span className="font-bold">
                <span className="">MDX</span>Blog
              </span>
            </div>
          </Button>
        </Link>
      </div>
      <p>
        Click the button above ☝️ to see the installation options for MDX Blog
        or a <em>lite</em> version of the app.
      </p>
      <hr />
      <p>
        We regularly publish content, including articles, tutorials, and news
        covering MDX, Next.js, and other static site generation frameworks.
        Click the button below to start reading 👇.
      </p>
      <div className="flex justify-center py-3 pb-6">
        {" "}
        <Link className="text-lg" href="/blog">
          <Button>
            <span className="text-lg">Start Reading</span>
          </Button>
        </Link>
      </div>
      <hr />
      <div className="flex justify-center pt-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          What is <span className="">MDX?</span>
        </h2>
      </div>
      <div className="flex justify-center">
        <Image
          src="/logos/mdx-logo.png"
          alt="MDX Logo"
          width={150} // Halve the width to 150px
          height={62}
        />
      </div>
      <div>
        MDX is a file format that combines Markdown with JSX, allowing
        developers to seamlessly embed React components within Markdown
        documents, enabling dynamic and interactive content creation. It
        facilitates the creation of rich, interactive documentation and blog
        posts in web development projects. MDX blends Markdown&apos;s
        straightforward syntax with the capability to embed dynamic JSX
        elements. Perfect for interactive, rich-content blogs.
      </div>
      <div>
        <ul>
          <li>
            <Link target="_blank" href="https://mdxjs.com/">
              • 
              <span className="underline">MDX Official Documentation</span>
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://nextjs.org/docs/app/building-your-application/configuring/mdx"
            >
              • <span className="underline">Integrating MDX with Next.js</span>
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://vercel.com/templates/next.js/portfolio-starter-kit"
            >
              •{" "}
              <span className="underline">
                Check out the Next.js portfolio starter template
              </span>{" "}
               
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className="flex justify-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          More About <span className="primary-color">MDX</span>Blog
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <p>
          <span className="font-bold">MDXBlog</span> is an independently created
          app built with the latest web technologies, offering a unique blogging
          experience. <span className="font-bold">MDXBlog</span> offers a
          simple, yet powerful template for creating static blogs using MDX
          (Markdown + JSX) and Next.js 14.
        </p>

        <p>
          We have no official affiliation with the MDX team or Next.js, we are
          simply fans of the technology and wanted to create a simple, free,
          easy-to-use blog template for the community.
        </p>

        <p>
          MDXBlog is a free, open-source project that is easy to install and
          deploy. It generates static pages that are fast, secure, and
          SEO-friendly. The app is designed to be easy to use and customize,
          with a clean, modern design that is fully responsive and
          mobile-friendly.
        </p>
      </div>

      <div>
        <span className="font-bold">Get MDXBlog</span>: Download the{" "}
        <Link target="_blank" href="https://github.com/owolfdev/mdx-blog-basic">
          <span className="font-bold">github repo</span>
        </Link>
        . Instructions for installation and deployment are included in the
        README .
      </div>
      <div>
        <ul>
          <li>
            <Link href="/about">
              • <span className="underline">Documentation</span>
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://github.com/owolfdev/mdx-blog-basic"
            >
              • <span className="underline">MDXBlog GitHub Repo</span>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              • 
              <span className="underline">
                The Blog, where you can find the latest news and tutorials
              </span>
              .
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
