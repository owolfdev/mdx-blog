"use client"

import { motion } from "framer-motion"
import { FileCode, Eye, Palette, Zap, GitBranch, Component } from "lucide-react"

const features = [
  {
    icon: FileCode,
    title: "MDX Component Embedding",
    description:
      "Seamlessly embed React components directly in your Markdown. Full TypeScript support with IntelliSense.",
  },
  {
    icon: Eye,
    title: "Instant Preview",
    description: "See your changes in real-time with hot module reloading. No refresh needed, just write and preview.",
  },
  {
    icon: Zap,
    title: "Zero Configuration",
    description: "Start writing immediately. Sensible defaults, no complex setup. Production-ready out of the box.",
  },
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description: "Direct integration with GitHub. Version control your content with automated deployments.",
  },
  {
    icon: Palette,
    title: "Theme System",
    description: "Built-in dark mode and customizable themes. Use our defaults or create your own design system.",
  },
  {
    icon: Component,
    title: "Component Registry",
    description: "Extensive library of pre-built MDX components. Callouts, tabs, cards, and more.",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Features() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center gap-4 text-center mb-16">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
          Everything You Need to Ship
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground leading-relaxed">
          Build production-ready documentation, blogs, and technical content with modern tooling.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
