export function HomeFeatures() {
  return (
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
          What is MDXBlog?
        </h2>
        <div className="space-y-4 text-base font-medium text-foreground/70 sm:text-lg">
          <p>
            This is where we experiment with static MDX sites, Markdown,
            Next.js, JavaScript, and React, and we blog about what we learn.
          </p>
          <p>
            We also offer templates, so you can start from a solid base and
            adapt it to your own projects.
          </p>
          {/* <p>
            This setup is used in real agency and client projects, and it is
            adapted per project.
          </p> */}
          {/* <p>
            It is here to show how this approach works in practice, not as a
            hosted tool or CMS product.
          </p> */}
        </div>
      </div>

    </section>
  );
}
