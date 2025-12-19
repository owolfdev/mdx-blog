import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { CodePreview } from "@/components/home/code-preview"
import { UseCases } from "@/components/home/use-cases"
import { CTA } from "@/components/home/cta"

export const metadata = {
  title: "MDXBlog 2.0 - A Better Way to Publish With MDX",
  description:
    "Production-ready MDX engine. React components inside your Markdown. Instant preview. Zero configuration.",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <CodePreview />
        <UseCases />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
