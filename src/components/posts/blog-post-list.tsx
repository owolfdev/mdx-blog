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
  showDate?: boolean;
}

const BlogPostList = ({
  blogs,
  trimDescription,
  showDate = true,
}: BlogPostListProps) => {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {blogs.map((blog) => (
        <li
          key={blog.slug}
          className="panel-surface group relative overflow-hidden p-6 transition-transform hover:-translate-y-0.5"
        >
          <Link
            href={`/blog/${blog.slug}`}
            className="relative block space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {showDate ? <span>{blog.formattedDate}</span> : <span />}
              {typeof blog.likes === "number" && blog.likes >= 1 && (
                <span className="border border-border bg-muted px-3 py-1 text-[0.65rem]">
                  {blog.likes} Likes
                </span>
              )}
            </div>
            <h3 className="text-2xl font-black leading-tight tracking-[-0.05em]">
              {blog.title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80 dark:text-muted-foreground">
              {trimDescription(blog.description)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogPostList;
