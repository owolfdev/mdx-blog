import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPopularPosts } from "@/lib/posts/get-popular-posts";
import type { CachedPost } from "@/types/post-types";

// Dynamically import the MDX file to access metadata and content
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function loadMdxFile(): Promise<any> {
  try {
    const mdxModule = await import("@/content/pages/home.mdx");
    return mdxModule;
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    return null;
  }
}

// Utility function to parse and format the date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Invalid Date"; // Handle invalid date
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function trimDescription(description: string) {
  const wordLimit = 20;
  const words = description.split(" ");

  if (words.length > wordLimit) {
    return `${words.slice(0, wordLimit).join(" ")}...`;
  }
  return description;
}

// Define the metadata generation function
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MDXBlog",
    description:
      "A simple static blog template built with Next.js and MDX. Easily create and deploy a blog with MDXBlog.",
  };
}

export default async function Home() {
  const popularPosts: CachedPost[] = await getPopularPosts();
  const mdxModule = await loadMdxFile();

  if (!mdxModule) {
    return <p>Page not found</p>; // Handle the case where the MDX file is not found
  }

  const { default: HomeContent, metadata } = mdxModule;

  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6 text-lg">
        <h1 className="text-5xl sm:text-7xl font-black text-center w-full">
          Welcome to <span className="primary-color">MDX</span>Blog
        </h1>
        <div className="flex justify-center w-full">
          <p className="text-center">
            A static blog template for developers, built with{" "}
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
        <div className="flex justify-center py-8">
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
        <div className="flex flex-col gap-8 text-center">
          <p>
            Click the button above ☝️ to see the installation options for
            MDXBlog.
          </p>

          <p>
            We regularly publish content, including articles, tutorials, and
            news covering MDX, Next.js, and other static site generation
            frameworks. Click the button below to start reading 👇.
          </p>
        </div>
        <div className="flex justify-center py-6">
          {" "}
          <Link className="text-lg" href="/blog">
            <Button size="lg">
              <span className="text-2xl">Start Reading</span>
            </Button>
          </Link>
        </div>

        {/* Dynamic Popular Articles */}
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl sm:text-5xl font-black text-center py-6">
            Popular Articles
          </h2>
          <div className="pb-2 flex flex-col gap-4">
            {popularPosts?.map((post: CachedPost) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug.replace(/\.mdx$/, "")}`}
              >
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow text-base">
                  <h3 className="font-black text-4xl">{post.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="">{formatDate(post.publishDate)}</p>
                    <p className="text-sm border-2 rounded-lg px-2 py-1 bg-muted m-2">
                      Likes: {post.likes}
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    {trimDescription(post.description)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* End Dynamic Popular Articles */}

        <HomeContent />
      </div>
    </div>
  );
}
