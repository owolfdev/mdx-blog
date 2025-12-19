"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code2, Briefcase, Database, ExternalLink, Github } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "Blog Template",
    description:
      "Modern blog with article listings, tags, search, and RSS feed. Perfect for personal or company blogs.",
    icon: BookOpen,
    image: "/modern-blog-template-dark-theme.jpg",
    tags: ["Blog", "Articles", "SEO"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Developer Docs",
    description: "Technical documentation template with searchable navigation, code highlighting, and version control.",
    icon: Code2,
    image: "/technical-documentation-template.jpg",
    tags: ["Docs", "API", "Technical"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Template",
    description: "Showcase your work with project galleries, case studies, and embedded demos. Built for creatives.",
    icon: Briefcase,
    image: "/developer-portfolio-template.png",
    tags: ["Portfolio", "Projects", "Showcase"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Knowledge Base",
    description:
      "Comprehensive knowledge base with categories, search, and multi-level navigation for team documentation.",
    icon: Database,
    image: "/knowledge-base-template.jpg",
    tags: ["Knowledge", "Search", "Enterprise"],
    demoUrl: "#",
    githubUrl: "#",
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

export function TemplateGrid() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid gap-8 md:grid-cols-2">
      {templates.map((template) => {
        const Icon = template.icon
        return (
          <motion.div
            key={template.id}
            variants={item}
            className="group overflow-hidden rounded-lg border border-border bg-card hover:shadow-xl transition-all"
          >
            <div className="relative overflow-hidden bg-muted aspect-video">
              <img
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/90 backdrop-blur">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl mb-3">{template.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{template.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                <Button asChild className="flex-1">
                  <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Preview
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={template.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
