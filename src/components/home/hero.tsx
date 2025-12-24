"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(249,172,0,0.18),transparent_60%)]" />
      <div className="site-container relative flex flex-col items-center gap-10 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="inline-flex items-center border border-border bg-muted px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-foreground/80">
            MDXBlog
          </span>
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            A Better Way To Publish With MDX
          </h1>
          <p className="max-w-2xl text-lg font-semibold text-foreground/70 sm:text-xl md:text-2xl">
            A Git-based, mobile friendly, static publishing system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-none bg-foreground px-8 text-sm font-black uppercase tracking-[0.2em] text-background hover:bg-foreground/90"
          >
            <Link href="/install">
              Explore the Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-none px-8 text-sm font-black uppercase tracking-[0.2em]"
          >
            <Link href="/blog">Read the Blog</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
