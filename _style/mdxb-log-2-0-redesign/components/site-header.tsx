"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileText, Menu, X } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Docs", href: "/docs" },
  { name: "Templates", href: "/templates" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6 text-foreground" />
            <span>MDXBlog</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button variant={pathname === item.href ? "secondary" : "ghost"} size="sm" className="text-sm">
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:flex bg-foreground text-background hover:bg-foreground/90">
            <Link href="/docs">Get Started</Link>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container py-4 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <Button variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start">
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button asChild className="w-full sm:hidden mt-2 bg-foreground text-background hover:bg-foreground/90">
              <Link href="/docs">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
