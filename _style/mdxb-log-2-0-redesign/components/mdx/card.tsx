import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CardGridProps {
  children: React.ReactNode
}

interface CardProps {
  title: string
  href: string
  children: React.ReactNode
}

export function CardGrid({ children }: CardGridProps) {
  return <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
}

export function Card({ title, href, children }: CardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all"
    >
      <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{children}</p>
      <div className="flex items-center text-sm font-medium text-accent">
        Learn more
        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
