import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DocsNav } from "@/components/docs/docs-nav"
import { DocsContent } from "@/components/docs/docs-content"

export const metadata = {
  title: "Documentation - MDXBlog 2.0",
  description: "Complete documentation for MDXBlog. Learn how to install, configure, and build with MDX.",
}

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 py-8">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-6rem)] w-full shrink-0 overflow-y-auto md:sticky md:block scrollbar-thin">
          <DocsNav />
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <DocsContent />
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
