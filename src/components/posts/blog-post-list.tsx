"use client";

import Link from "next/link";

interface BlogPost {
  slug: string;
  type: string;
  date: string;
  title: string;
  description: string;
  image: string;
  author: string;
  tags: string[];
  formattedDate?: string;
  likes?: number; // Change to allow undefined
}

interface BlogPostListProps {
  blogs: BlogPost[];
  trimDescription: (description: string) => string;
}

const BlogPostList = ({ blogs, trimDescription }: BlogPostListProps) => {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {blogs.map((blog) => (
        <li
          key={blog.slug}
          className="group relative overflow-hidden border border-border bg-card p-6 transition-shadow hover:shadow-lg"
        >
          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent/10" />
          <Link
            href={`/blog/${blog.slug}`}
            className="relative block space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span>{blog.formattedDate}</span>
              {typeof blog.likes === "number" && (
                <span className="rounded-full border border-border px-3 py-1 text-[0.65rem]">
                  {blog.likes} Likes
                </span>
              )}
            </div>
            <h3 className="text-2xl font-black leading-tight tracking-normal">
              {blog.title}
            </h3>
            <p className="text-sm text-foreground/80 dark:text-muted-foreground">
              {trimDescription(blog.description)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogPostList;
