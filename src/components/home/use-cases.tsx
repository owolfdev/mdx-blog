"use client";

import { motion } from "framer-motion";
import { BookOpen, Newspaper, Code2, Layers3 } from "lucide-react";

const useCases = [
  {
    icon: BookOpen,
    title: "Technical Publications",
    description:
      "This works well when long-form content needs to live next to code.",
  },
  {
    icon: Newspaper,
    title: "Release Notes",
    description:
      "This keeps updates in Git history instead of a separate CMS.",
  },
  {
    icon: Code2,
    title: "Product Documentation",
    description:
      "This makes it easier to keep docs in the same repo as the product.",
  },
  {
    icon: Layers3,
    title: "Content Collections",
    description:
      "This keeps multi-section sites tidy and predictable as they grow.",
  },
];

export function HomeUseCases() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="site-container py-16 md:py-24">
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
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 text-center">
          <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
            Where MDX Fits
          </h3>
          <p className="text-base font-medium text-foreground/70 sm:text-lg">
            Use cases where a MDX powered, file-based, static workflow makes
            sense.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative overflow-hidden border border-border bg-background p-8"
              >
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-accent/10" />
                <div className="relative space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-primary/15 dark:bg-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
