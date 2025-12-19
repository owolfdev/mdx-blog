import { MDXComponents } from "@/components/mdx/mdx-components"

const content = `
# Introduction to MDXBlog

Welcome to MDXBlog 2.0 - a production-ready MDX publishing engine designed for developers who want to create rich, interactive technical content.

<Callout type="info">
This is MDX in action! This blue callout is a React component embedded directly in Markdown.
</Callout>

## What is MDX?

MDX is a format that lets you seamlessly write JSX in your Markdown documents. You can import components, export metadata, and write React components alongside your content.

## Key Features

<Steps>
<Step title="Write Markdown">
Start with familiar Markdown syntax for your content structure.
</Step>

<Step title="Add Components">
Embed React components anywhere you need interactivity or custom styling.
</Step>

<Step title="Deploy Instantly">
Build and deploy with a single command. Zero configuration required.
</Step>
</Steps>

## Code Examples

Here's a simple TypeScript example:

\`\`\`typescript
interface BlogPost {
  title: string
  author: string
  publishedAt: Date
}

function formatPost(post: BlogPost): string {
  return \`\${post.title} by \${post.author}\`
}
\`\`\`

<Callout type="warning">
Always validate your MDX files before deploying to production.
</Callout>

## Installation

Get started with MDXBlog in seconds:

\`\`\`bash
# Create a new project
npx create-mdxblog@latest my-blog

# Navigate to your project
cd my-blog

# Start the development server
npm run dev
\`\`\`

## Next Steps

<CardGrid>
  <Card title="Quick Start" href="/docs/quick-start">
    Build your first MDX blog in 5 minutes
  </Card>
  <Card title="Components" href="/docs/components">
    Explore available MDX components
  </Card>
  <Card title="Theming" href="/docs/theming">
    Customize colors, fonts, and styles
  </Card>
</CardGrid>
`

export function DocsContent() {
  return (
    <div className="mx-auto w-full min-w-0">
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXComponents source={content} />
      </div>
    </div>
  )
}
