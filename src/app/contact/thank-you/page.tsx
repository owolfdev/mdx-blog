import React from "react";

function Page() {
  return (
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          MDXBlog
        </span>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Thank you.
        </h1>
        <p className="text-base font-medium text-muted-foreground sm:text-lg">
          Your message has been sent. We will get back to you soon.
        </p>
      </div>
    </section>
  );
}

export default Page;
