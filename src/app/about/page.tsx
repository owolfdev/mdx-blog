import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About MDXBlog",
  description:
    "MDXBlog is a straightforward place for MDX and Next.js tips plus a ready-to-clone template.",
};

export default function AboutPage() {
  return (
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            About MDXBlog
          </h1>
          <p className="text-base font-medium text-foreground/70 sm:text-lg">
            MDXBlog is a straightforward place for practical notes on MDX,
            Markdown, Next.js, JavaScript, and React. We share what works and
            offer a ready-to-clone template you can adapt to your own projects.
          </p>
        </div>

        <div className="space-y-3 text-base font-medium text-foreground/70 sm:text-lg">
          <p>
            Read the latest posts at{" "}
            <a className="text-primary hover:underline" href="/blog">
              /blog
            </a>
            .
          </p>
          <p>
            Browse code samples at{" "}
            <a className="text-primary hover:underline" href="/code">
              /code
            </a>
            .
          </p>
          <p>
            Grab the template from{" "}
            <a
              className="text-primary hover:underline"
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
