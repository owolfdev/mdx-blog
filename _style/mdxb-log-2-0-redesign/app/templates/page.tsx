import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TemplateGrid } from "@/components/templates/template-grid"

export const metadata = {
  title: "Templates - Start Your Project Fast | MDXBlog",
  description: "Browse production-ready starter templates for blogs, documentation, portfolios, and knowledge bases.",
}

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-[58rem] mb-16 text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Start With a Template
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Production-ready starter templates to kickstart your project. Clone, customize, and deploy in minutes.
            </p>
          </div>

          <TemplateGrid />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
