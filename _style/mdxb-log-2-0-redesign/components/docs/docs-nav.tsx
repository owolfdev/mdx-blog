"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Rocket, Palette, Code2 } from "lucide-react"

const docsNav = [
  {
    title: "Getting Started",
    icon: Rocket,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    icon: BookOpen,
    items: [
      { title: "MDX Basics", href: "/docs/mdx-basics" },
      { title: "Components", href: "/docs/components" },
      { title: "File Structure", href: "/docs/file-structure" },
    ],
  },
  {
    title: "Customization",
    icon: Palette,
    items: [
      { title: "Theming", href: "/docs/theming" },
      { title: "Configuration", href: "/docs/configuration" },
      { title: "Plugins", href: "/docs/plugins" },
    ],
  },
  {
    title: "Advanced",
    icon: Code2,
    items: [
      { title: "Custom Components", href: "/docs/custom-components" },
      { title: "API Reference", href: "/docs/api" },
    ],
  },
]

export function DocsNav() {
  const pathname = usePathname()

  return (
    <nav className="w-full">
      <div className="space-y-6">
        {docsNav.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3 px-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">{section.title}</h4>
              </div>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                        pathname === item.href ? "bg-muted font-medium text-accent" : "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
