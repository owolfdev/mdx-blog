"use client";

import { motion } from "framer-motion";
import {
  Blocks,
  FolderGit2,
  Sparkles,
  Workflow,
} from "lucide-react";
import { MdxPlayground } from "@/components/mdx/mdx-playground";

const platformCards = [
  {
    icon: Sparkles,
    title: "Content generation",
    description:
      "Start with drafts, metadata, and reusable structures designed for technical writing.",
  },
  {
    icon: Blocks,
    title: "Component-aware authoring",
    description:
      "Mix Markdown with React components so examples, embeds, and custom UI stay part of the document.",
  },
  {
    icon: FolderGit2,
    title: "Git-backed publishing",
    description:
      "Keep posts and pages in the repo for versioning, review, portability, and long-term control.",
  },
  {
    icon: Workflow,
    title: "Production-ready workflow",
    description:
      "Preview, organize, and ship your content from a system built for Next.js rather than a generic CMS.",
  },
];

export function HomeUseCases() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="site-container py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
          <div className="panel-surface p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              What it is
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.06em] sm:text-4xl">
              A tighter way to run an MDX publishing workflow.
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                This site works best when positioned as an MDX-focused content
                generation platform, not just a generic blog template. The
                strongest value is the combination of authoring, preview,
                component usage, and file-based publishing.
              </p>
              <p>
                That makes it a good fit for documentation sites, technical
                blogs, product notes, learning resources, and content teams that
                want more control than a traditional CMS gives them.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {platformCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="panel-surface p-5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-[0.18em]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <MdxPlayground variant="embedded" />
        </div>
      </div>
    </section>
  );
}
