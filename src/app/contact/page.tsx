// app/contact/page.tsx
import type { Metadata } from "next";
import { ContactForm } from "./form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us",
};

export default async function ContactPage() {
  // const message = await searchParams;

  return (
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            MDXBlog
          </span>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Contact
          </h1>
          <p className="text-base font-medium text-foreground/80 sm:text-lg">
            Have a question or want to collaborate? Send us a note and we’ll get
            back to you soon.
          </p>
        </header>
        <div className="border border-border bg-card p-6 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
