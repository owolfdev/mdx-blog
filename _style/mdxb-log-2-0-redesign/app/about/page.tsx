import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Lightbulb, Users, Rocket, Target } from "lucide-react"

export const metadata = {
  title: "About MDXBlog - Our Mission & Philosophy",
  description: "Learn about MDXBlog's mission to empower developers with production-ready MDX publishing tools.",
}

const values = [
  {
    icon: Lightbulb,
    title: "Developer-First",
    description:
      "Built by developers, for developers. We understand your workflow and build tools that enhance it, not disrupt it.",
  },
  {
    icon: Users,
    title: "Open & Extensible",
    description:
      "Open-source at our core. Extend, customize, and contribute. Your content platform should grow with you.",
  },
  {
    icon: Rocket,
    title: "Performance Matters",
    description: "Fast builds, instant previews, and optimized output. Performance isn't optional—it's fundamental.",
  },
  {
    icon: Target,
    title: "Zero Friction",
    description: "Start writing immediately. No complex configuration, no setup headaches. Just create and publish.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-[58rem]">
            <div className="mb-16">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl mb-6">
                Building the Future of
                <span className="text-accent"> Technical Publishing</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                MDXBlog is a production-ready MDX publishing engine designed to empower developers and technical writers
                to create rich, interactive content.
              </p>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none mb-16">
              <h2 className="text-3xl font-bold mb-4">Why MDX?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Traditional Markdown is great for simple content, but modern technical documentation demands more.
                Interactive examples, embedded components, and dynamic content are no longer optional—they're expected.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                MDX bridges the gap between Markdown's simplicity and React's power. Write natural prose in Markdown,
                then seamlessly embed React components wherever you need interactivity. No context switching, no build
                complexity.
              </p>

              <h2 className="text-3xl font-bold mb-4 mt-12">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We believe great tools should be invisible. MDXBlog handles the complexity of MDX compilation, hot
                reloading, and deployment so you can focus on what matters: creating exceptional content.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-16">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className="rounded-lg border border-border bg-card p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Open Source</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                MDXBlog is open source and always will be. We believe in transparency, community contribution, and
                building in public. Check out our GitHub repository, submit issues, or contribute features.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Licensed under MIT. Free for personal and commercial use.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
