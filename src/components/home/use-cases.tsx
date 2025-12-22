"use client";

import { motion } from "framer-motion";
import { BookOpen, Newspaper, Code2, Layers3 } from "lucide-react";

const useCases = [
  {
    icon: BookOpen,
    title: "Technical Articles",
    description:
      "Publish in-depth tutorials and guides with embedded code examples.",
  },
  {
    icon: Newspaper,
    title: "News & Updates",
    description:
      "Ship announcements and release notes without touching a database.",
  },
  {
    icon: Code2,
    title: "Developer Docs",
    description:
      "Document APIs and products with MDX-powered, interactive pages.",
  },
  {
    icon: Layers3,
    title: "Static Site Collections",
    description:
      "Organize content for portfolios, knowledge bases, or internal hubs.",
  },
];

export function HomeUseCases() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="site-container py-16 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Designed for the Way You Publish
          </h2>
          <p className="text-base font-medium text-foreground/80 sm:text-lg">
            Match MDXBlog with the content you already create and share.
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
