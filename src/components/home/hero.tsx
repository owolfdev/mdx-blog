"use client";

import Link from "next/link";
import { ArrowRight, FileText, PenSquare, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const capabilityCards = [
  {
    icon: PenSquare,
    title: "Generate",
    description:
      "Draft technical posts, tutorials, and page content in an MDX-native format.",
  },
  {
    icon: FileText,
    title: "Edit",
    description:
      "Work directly in files with metadata, components, and previews kept in the same workflow.",
  },
  {
    icon: Workflow,
    title: "Publish",
    description:
      "Ship Git-backed content collections without bolting on a separate CMS.",
  },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(35,39,46,0.06),transparent_42%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_42%)]" />
      <div className="site-container relative py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="panel-surface flex flex-col gap-6 p-7 md:p-9"
          >
            <span className="w-fit bg-primary px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-primary-foreground">
              MDX-first platform
            </span>
            <div className="space-y-4">
              <h1 className="text-5xl font-black tracking-[-0.08em] text-foreground sm:text-6xl md:text-7xl">
                Generate, edit, and publish technical content with MDX.
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                MDXBlog is a file-based content generation platform for teams
                who want Markdown, React components, and publishing workflows to
                live in one place instead of across disconnected tools.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-none bg-foreground px-6 text-xs font-black uppercase tracking-[0.22em] text-background hover:bg-foreground/90"
              >
                <Link href="/blog">
                  Explore the platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-none border-foreground/20 px-6 text-xs font-black uppercase tracking-[0.22em]"
              >
                <Link href="/code">Browse code examples</Link>
              </Button>
            </div>

            <div className="grid gap-3 border-t border-border pt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground sm:grid-cols-3">
              <div>
                <span className="block text-2xl font-black tracking-[-0.06em] text-foreground">
                  MDX
                </span>
                Native authoring
              </div>
              <div>
                <span className="block text-2xl font-black tracking-[-0.06em] text-foreground">
                  Git
                </span>
                File-backed workflow
              </div>
              <div>
                <span className="block text-2xl font-black tracking-[-0.06em] text-foreground">
                  Next.js
                </span>
                Ready to ship
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="panel-surface flex flex-col gap-4 p-5 md:p-6"
          >
            <div className="border-b border-border pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Positioning
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.06em]">
                Built for component-driven publishing.
              </h2>
            </div>

            <div className="space-y-3">
              {capabilityCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="border border-border bg-background/70 p-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-[0.18em]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
