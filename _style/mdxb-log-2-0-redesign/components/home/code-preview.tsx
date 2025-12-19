"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const mdxExample = `---
title: "Getting Started with MDX"
description: "Learn how to use React components in Markdown"
---

# Welcome to MDXBlog

This is regular **Markdown** content, but with superpowers.

<Callout type="info">
  You can use React components directly in your content!
</Callout>

## Code Examples

\`\`\`tsx
function Welcome() {
  return <h1>Hello World</h1>
}
\`\`\`

<Tabs defaultValue="preview">
  <TabsList>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
</Tabs>`

const componentExample = `import { Callout } from '@/components/mdx'

export function MyContent() {
  return (
    <>
      <h1>Interactive Documentation</h1>
      
      <Callout type="warning">
        This component is rendered from React!
      </Callout>
      
      <CodeBlock language="typescript">
        {\`const greeting = "Hello MDX";\`}
      </CodeBlock>
    </>
  )
}`

const configExample = `// mdxblog.config.ts
export default {
  title: 'My Documentation',
  theme: {
    primaryColor: '#FFD700',
    font: 'Geist',
  },
  components: {
    Callout: './components/callout',
    CodeBlock: './components/code-block',
  },
  plugins: [
    'mdx-prism',
    'mdx-embed',
  ],
}`

export function CodePreview() {
  return (
    <section className="bg-muted/30 py-24 md:py-32">
      <div className="container">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center gap-4 text-center mb-16">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Write Content, Not Configuration
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground leading-relaxed">
            Focus on creating great content while MDXBlog handles the complexity.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="mdx" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="mdx">MDX File</TabsTrigger>
              <TabsTrigger value="component">Components</TabsTrigger>
              <TabsTrigger value="config">Config</TabsTrigger>
            </TabsList>

            <TabsContent value="mdx" className="mt-6">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono ml-2">getting-started.mdx</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto scrollbar-thin">
                  <code className="font-mono text-foreground">{mdxExample}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="component" className="mt-6">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono ml-2">my-content.tsx</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto scrollbar-thin">
                  <code className="font-mono text-foreground">{componentExample}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="config" className="mt-6">
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-muted-foreground font-mono ml-2">mdxblog.config.ts</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto scrollbar-thin">
                  <code className="font-mono text-foreground">{configExample}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
