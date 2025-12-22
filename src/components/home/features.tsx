"use client";

import { motion } from "framer-motion";
import {
  FileCode2,
  Rocket,
  Database,
  Palette,
  Layers,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileCode2,
    title: "MDX-First Writing",
    description:
      "Write Markdown with React components embedded directly in your content.",
  },
  {
    icon: Database,
    title: "Local-First Content",
    description:
      "No database required. Content lives as editable MDX files in your repo.",
  },
  {
    icon: Rocket,
    title: "Fast Static Pages",
    description:
      "Build SEO-friendly pages with Next.js and ship blazing-fast performance.",
  },
  {
    icon: Palette,
    title: "Clean, Responsive Design",
    description:
      "A modern UI that looks great across devices and adapts to your brand.",
  },
  {
    icon: Layers,
    title: "Open Template, Easy to Extend",
    description:
      "Start with a solid foundation and customize the system to fit your needs.",
  },
  {
    icon: Sparkles,
    title: "Developer-Friendly Workflow",
    description:
      "A frictionless publishing experience built for developers and teams.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function HomeFeatures() {
  return (
    <section className="site-container py-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
          Built for Content That Ships
        </h2>
        <p className="text-base font-medium text-foreground/70  sm:text-lg">
          MDXBlog keeps publishing simple while giving you the power of React,
          MDX, and Next.js.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative overflow-hidden border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-primary/15 dark:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
