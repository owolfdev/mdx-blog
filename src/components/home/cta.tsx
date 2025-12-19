"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HomeCta() {
  return (
    <section className="site-container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 border border-border bg-card px-6 py-12 text-center md:px-12"
      >
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
          Ready to Build with MDXBlog?
        </h2>
        <p className="max-w-2xl text-base font-medium text-muted-foreground sm:text-lg">
          Get the template, publish your first post, and ship a modern MDX site
          without the busywork.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-none bg-foreground px-8 text-sm font-black uppercase tracking-[0.2em] text-background hover:bg-foreground/90"
          >
            <Link href="/install">
              Get the Template
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-none px-8 text-sm font-black uppercase tracking-[0.2em]"
          >
            <Link href="/donate">
              Support the Project
              <HeartHandshake className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
