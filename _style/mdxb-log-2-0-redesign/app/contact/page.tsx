import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { Mail, MessageSquare, Github } from "lucide-react"

export const metadata = {
  title: "Contact Us - Get in Touch with MDXBlog",
  description:
    "Have questions about MDXBlog? Get in touch with our team for support, partnerships, or just to say hello.",
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help from our support team",
    contact: "support@mdxblog.io",
  },
  {
    icon: MessageSquare,
    title: "Community",
    description: "Join our Discord community",
    contact: "discord.gg/mdxblog",
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Report issues or contribute",
    contact: "github.com/mdxblog",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-[58rem] mb-16 text-center">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about MDXBlog? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-12">
            {contactMethods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.title} className="rounded-lg border border-border bg-card p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  <p className="text-sm font-mono text-accent">{method.contact}</p>
                </div>
              )
            })}
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg border border-border bg-card p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
