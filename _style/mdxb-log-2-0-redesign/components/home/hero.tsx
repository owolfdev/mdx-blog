"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="container flex flex-col items-center justify-center gap-12 py-12 md:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <div className="inline-flex items-center bg-muted px-5 py-2 text-sm font-bold text-foreground/80 uppercase tracking-wider">
          MDXBlog 2.0
        </div>

        <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] max-w-6xl leading-[0.9]">
          A Better Way to Publish With MDX
        </h1>

        <p className="max-w-[720px] text-xl text-foreground/60 sm:text-2xl md:text-3xl leading-tight font-bold">
          Production-ready MDX engine. React components inside your Markdown. Instant preview. Zero configuration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <Button
          asChild
          size="lg"
          className="text-base h-14 px-10 font-black uppercase tracking-wide shadow-none rounded-sm bg-foreground text-background hover:bg-foreground/90"
        >
          <Link href="/docs">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="text-base h-14 px-10 font-black uppercase tracking-wide bg-transparent hover:bg-foreground/5 rounded-sm"
        >
          <Link href="https://github.com" target="_blank">
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 border border-border bg-card p-1 shadow-none rounded-sm"
      >
        <div className="bg-muted px-6 py-4 font-mono text-sm md:text-base font-semibold">
          <span className="text-muted-foreground select-none">$</span> <span>npx create-mdxblog@latest</span>
        </div>
      </motion.div>
    </section>
  )
}
