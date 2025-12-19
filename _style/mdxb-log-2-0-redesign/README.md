# MDXBlog 2.0

A modern, production-ready MDX publishing engine built with Next.js 15, TypeScript, Tailwind CSS, and ShadCN UI.

## Features

- **MDX Support** - Write Markdown with embedded React components
- **Dark Mode** - Built-in theme switching with next-themes
- **Component Registry** - Pre-built MDX components (Callout, Steps, Cards, etc.)
- **Responsive Design** - Mobile-first, fully responsive layout
- **Type Safe** - Full TypeScript support
- **Production Ready** - Optimized for performance and SEO

## Pages

- **Home** - Hero section with features and code previews
- **About** - Mission, philosophy, and values
- **Docs** - Complete documentation with side navigation
- **Templates** - Starter template gallery
- **Contact** - Contact form with multiple channels

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Project Structure

\`\`\`
app/
├── page.tsx              # Home page
├── about/page.tsx        # About page
├── contact/page.tsx      # Contact page
├── docs/page.tsx         # Documentation page
├── templates/page.tsx    # Templates gallery
├── layout.tsx            # Root layout
└── globals.css           # Global styles

components/
├── home/                 # Home page components
├── docs/                 # Documentation components
├── templates/            # Template components
├── mdx/                  # MDX components
├── ui/                   # shadcn/ui components
├── site-header.tsx       # Global header
├── site-footer.tsx       # Global footer
└── theme-provider.tsx    # Theme provider

lib/
├── utils.ts              # Utility functions
└── mdx-components-registry.ts  # MDX component registry
\`\`\`

## MDX Components

Available MDX components:

- `<Callout type="info|warning|error|success">` - Styled callout boxes
- `<Steps>` and `<Step>` - Step-by-step guides
- `<CardGrid>` and `<Card>` - Card layouts
- `<CodeBlock>` - Syntax highlighted code blocks
- `<Tabs>` and `<Tab>` - Tabbed content

## Customization

### Colors

Edit `app/globals.css` to customize the color palette. The design uses a yellow accent color with black/white/gray neutrals.

### Fonts

Fonts are configured in `app/layout.tsx` using next/font. Currently using Geist and Geist Mono.

### Components

Add custom MDX components in `lib/mdx-components-registry.ts` to make them available in all MDX files.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- ShadCN UI
- Framer Motion
- next-mdx-remote
- next-themes

## License

MIT
