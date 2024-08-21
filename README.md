# MDXBlog

[**MDXBlog** (mdxblog.io)](https://mdxblog.io) is a platform built with the latest web technologies, offering a unique blogging experience. MDXBlog is a simple template for creating blogs using MDX (Markdown + JSX) and Next.js 14. Unlike traditional blogging solutions that rely on a database to store content, content management in MDXBlog is handled by easily editable Markdown (MDX) files in a folder on your local machine! It's a good solution for those who appreciate the ease of Markdown and the power of React components.

Our project is fully accessible on **[GitHub](https://github.com/owolfdev/mdx-blog)**.

## Installation

- Clone the [**repo**](https://github.com/owolfdev/mdx-blog)
- Run `npm install`
- Run `npm run dev`
- Open `http://localhost:3000` in your browser
- Create a remote repo on GitHub
- Push your local repo to GitHub
- Deploy on Vercel

## Create a Post

- Use the '+' icon in the nav bar, in development mode only, to create a new post - or simply create a new MDX file in the `data/posts` directory, manually.
- Edit posts in the browser or manually using VS Code (recommended), or any other text editor.

## Key Features of MDXBlog

- **Next.js 14 & App Router**: Utilizing the cutting-edge features of Next.js 14, MDXBlog offers a seamless and efficient user experience, underpinned by the powerful app router for smooth navigation.
- [**Deployed on Vercel**](https://vercel.com): Experience the reliability and speed of Vercel, ensuring that our static blog site is always available and performs exceptionally.
- **SEO Optimized**: With automatic sitemap generation at build time through 'next sitemap', our platform is finely tuned for search engine optimization, enhancing the visibility and reach of your content.
- **Dynamic Publishing**: Our platform smartly handles future-dated posts, ensuring they are published only on or after their set date, thanks to a meticulous filtering system.
- **Development Mode Features**: In development mode, users can swiftly create new posts using the '+' icon, streamlining the content creation process.
- **Flexible Content Editing**: Edit your MDX (Markdown + JSX) posts with ease, either directly in the browser or using VS Code, providing a flexible and user-friendly environment for content creators.

## Custom MDX Components

- `<YouTube />`: Seamlessly embed YouTube videos within your content.
- `<Image />`: Integrate images elegantly, enhancing the visual appeal of your posts.
- `code`: Include and showcase code snippets with clarity and style.

## Dynamic Page Rendering

Our dynamic page rendering system is the backbone of MDXBlog, carefully extracting and presenting content. We now use `next-mdx` for rendering MDX content and metadata objects in our MDX files. Custom components like YouTube, Image, and Code bring a rich and interactive blogging experience.

### Example MDX File

Here's an example of an MDX file with a metadata object:

```mdx
export const metadata = {
  id: "iHoHBBR4CMRSjCnfYTFVgw",
  type: "blog",
  title: "A Beginner's Guide to MDX",
  author: "O Wolfson",
  publishDate: "2024-01-10",
  description:
    "Welcome to the world of MDX, a powerful hybrid of Markdown and JSX that's revolutionizing the way we write and interact with content on the web. ",
  category: ["Web Development"],
  tags: ["mdx", "guide"],
};

import { Button } from "@/components/ui/button";

Welcome to the transformative world of MDX, a hybrid of Markdown and JSX, poised to change how we interact with content on the web. This conceptual overview aims to shed light on MDX's nature and its application in creating interactive blog posts.
```

## Development Insights

- We no longer use frontmatter or `mdx-remote`. Instead, we use metadata objects within the MDX files.
- Utilizing `next-mdx`, our platform now efficiently processes and renders MDX content directly, allowing for dynamic and interactive posts.
- Only relevant posts are displayed, based on their publication date.
- In development mode, additional tools like EditPostButton and OpenInVSCode are available, enhancing the ease of content management and editing.

**MDXBlog** represents a blend of technological innovation and user-centric design, providing a platform that's not only a pleasure to use but also powerful in its capabilities. Whether you're a developer, a content creator, or someone passionate about blogging, MDXBlog offers you the tools to share your stories and ideas with the world effortlessly.
