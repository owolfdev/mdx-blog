import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About MDXBlog",
  description:
    "MDXBlog is an MDX-focused content generation platform built for file-based publishing with Next.js.",
};

export default function AboutPage() {
  return (
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 text-center">
        <div className="panel-surface space-y-4 p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            About
          </p>
          <h1 className="text-3xl font-black tracking-[-0.06em] sm:text-4xl md:text-5xl">
            About MDXBlog
          </h1>
          <p className="text-base font-medium text-foreground/70 sm:text-lg">
            MDXBlog is an MDX-focused content generation platform for people who
            want writing, components, previews, and publishing to stay in one
            Git-backed workflow.
          </p>
        </div>

        <div className="space-y-3 text-base font-medium text-foreground/70 sm:text-lg">
          <p>
            Read the latest posts at{" "}
            <a
              className="text-foreground/70 hover:text-foreground hover:underline dark:text-primary"
              href="/blog"
            >
              /blog
            </a>
            .
          </p>
          <p>
            Browse code samples at{" "}
            <a
              className="text-foreground/70 hover:text-foreground hover:underline dark:text-primary"
              href="/code"
            >
              /code
            </a>
            .
          </p>
          <p>
            Start from the template at{" "}
            <a
              className="text-foreground/70 hover:text-foreground hover:underline dark:text-primary"
              href="https://github.com/owolfdev/mdx-nextjs-latest"
            >
              github.com/owolfdev/mdx-nextjs-latest
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
