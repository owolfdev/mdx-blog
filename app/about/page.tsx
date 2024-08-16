import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MDX Blog | About",
  };
}

export default function About() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          About <span className="primary-color">MDX</span>Blog
        </h1>
        <ReactMarkdown className="flex flex-col gap-6">
          {aboutContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

const aboutContent = `
Unlike traditional blogging solutions that rely on a database to store content, content management in MDXBlog is handled by easily editable Markdown **(mdx) files in a folder on your local machine**! It's a good solution for those who appreciate the ease of Markdown and the power of React components. 

[MDXBlog (mdxblog.io)](https://mdxblog.io) is an independently created blog app template built with the latest web technologies, offering a unique blogging experience. MDXBlog is a simple template for creating blogs using MDX (Markdown + JSX) and Next.js 14. We have no official affiliation with the MDX team or Next.js, we are simply fans of the technology and wanted to create a simple, free, easy-to-use blog template for the community.

Our project is fully accessible on **[GitHub. Here is the latest code.](https://github.com/owolfdev/mdx-blog)** Note that this is a codebase in development. 

A pared-down, clean and stable version of the code can be found on **[GitHub. Here is the latest code.](https://github.com/owolfdev/next-template-mdx-shad)**

Here is the **[legacy version of MDXBlog](https://github.com/owolfdev/mdx-blog-basic) on GitHub**, which is a more complex version of the blog template, with additional features and functionality. The legacy version is not actively maintained, but it is still available for use.

Find relevant articles on the blog, including:

- • [Installation](https://www.mdxblog.io/blog/how-to-install-mdx-blog-and-deploy-on-vercel)
- • [A User Guide](https://www.mdxblog.io/blog/how-to-use-mdx-blog)
- • [Development Insights](https://www.mdxblog.io/blog/rendering-mdx-content-in-next.js-14)

**Getting Started**

**Installation:** 
- • Clone the [**repo**](https://github.com/owolfdev/mdx-blog-basic)
- • Run 'npm install'
- • Run 'npm run dev'
- • Open 'http://localhost:3000' in your browser
- • Create a remote repo on GitHub
- • Push your local repo to GitHub
- • Deploy on Vercel

**How to Use MDX Blog:**

You'll find a directory called content/blogs where you can create your blog posts. Follow the template and you will be fine. 

**Detailed Instructions:**

**Create a post**
- • Use the '+' icon in the nav bar, in development mode only, to create a new post - or simply create a new MDX file in the 'data/posts' directory, manually. 
- • Edit posts in the browser or manually using VS Code (recommended), or any other text editor.

**Key Features of MDX Blog:**

- • **Next.js 14 & App Router**: Utilizing the cutting-edge features of Next.js 14, MDX Blog offers a seamless and efficient user experience, underpinned by the powerful app router for smooth navigation.

- • [**Deployed on Vercel**:](https://vercel.com) Experience the reliability and speed of Vercel, ensuring that our static blog site is always available and performs exceptionally.

- • **SEO Optimized**: With automatic sitemap generation at build time through 'next sitemap', our platform is finely tuned for search engine optimization, enhancing the visibility and reach of your content.

- • **Dynamic Publishing**: Our platform smartly handles future-dated posts, ensuring they are published only on or after their set date, thanks to a meticulous filtering system.

- • **Development Mode Features**: In development mode, users can swiftly create new posts using the '+' icon, streamlining the content creation process.

- • **Flexible Content Editing**: Edit your MDX (Markdown + JSX) posts with ease, either directly in the browser or using VS Code, providing a flexible and user-friendly environment for content creators.

**Custom MDX Components:**
- **<YouTube />**: Seamlessly embed YouTube videos within your content.
- **<Image />**: Integrate images elegantly, enhancing the visual appeal of your posts.
- **code**: Include and showcase code snippets with clarity and style.

### **Dynamic Page Rendering**

Our dynamic page rendering system is the backbone of MDX Blog, carefully extracting and presenting content. It leverages the next-mdx-remote/rsc for rendering MDX content, along with custom components like YouTube, Image, and Code, bringing a rich and interactive blogging experience.

**Development Insights:**
- • Utilizing gray-matter for front matter parsing, we extract crucial metadata for SEO and rendering purposes.
- • Only relevant posts are displayed, based on their publication date.
- • In development mode, additional tools like EditPostButton and OpenInVSCode are available, enhancing the ease of content management and editing.

**MDX Blog** represents a blend of technological innovation and user-centric design, providing a platform that's not only a pleasure to use but also powerful in its capabilities. Whether you're a developer, a content creator, or someone passionate about blogging, MDX Blog offers you the tools to share your stories and ideas with the world effortlessly.

`;
