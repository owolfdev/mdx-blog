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
      "This keeps content flexible while still letting you use components.",
  },
  {
    icon: Database,
    title: "Local-First Content",
    description:
      "This keeps content as real files in Git, so review and history stay simple.",
  },
  {
    icon: Rocket,
    title: "Fast Static Pages",
    description:
      "This makes it easier to ship predictable static builds with fewer moving parts.",
  },
  {
    icon: Palette,
    title: "Clean, Responsive Design",
    description:
      "This works well when the UI needs to be adapted to match each project.",
  },
  {
    icon: Layers,
    title: "Open Template, Easy to Extend",
    description:
      "This keeps the setup clear when you extend or swap parts over time.",
  },
  {
    icon: Sparkles,
    title: "Developer-Friendly Workflow",
    description:
      "This makes it easier for teams to review, deploy, and keep changes in sync.",
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
