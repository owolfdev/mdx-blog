"use client"

import { motion } from "framer-motion"
import { BookOpen, Code2, Briefcase, Database } from "lucide-react"

const useCases = [
  {
    icon: BookOpen,
    title: "Technical Blogs",
    description: "Create engaging technical content with interactive code examples and live demos.",
    stats: "10k+ blogs powered",
  },
  {
    icon: Code2,
    title: "Developer Documentation",
    description: "Build comprehensive API docs with searchable navigation and version control.",
    stats: "500+ companies",
  },
  {
    icon: Briefcase,
    title: "Portfolio Sites",
    description: "Showcase your work with dynamic case studies and embedded project demos.",
    stats: "1M+ visitors/month",
  },
  {
    icon: Database,
    title: "Knowledge Bases",
    description: "Organize company knowledge with powerful search and categorization.",
    stats: "50+ enterprises",
  },
]

export function UseCases() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center gap-4 text-center mb-16">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
          Trusted by Developers Worldwide
        </h2>
        <p className="max-w-[700px] text-lg text-muted-foreground leading-relaxed">
          From solo developers to enterprise teams, MDXBlog powers content that matters.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon
          return (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 hover:shadow-lg transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 mb-6">
                  <Icon className="h-7 w-7 text-accent" />
                </div>

                <h3 className="font-bold text-xl mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{useCase.description}</p>

                <div className="inline-flex items-center text-sm font-medium text-accent">{useCase.stats}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
