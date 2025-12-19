"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="bg-muted/30 py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-[58rem] flex-col items-center gap-6 text-center"
        >
          <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Transform Your Content?
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground leading-relaxed">
            Join thousands of developers who chose MDXBlog for their content publishing needs. Start building today,
            deploy instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Button asChild size="lg" className="text-base">
              <Link href="/docs">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
