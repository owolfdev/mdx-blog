import Link from "next/link";
import LoaderLink from "@/components/nav/loader-link";
// import { BlogPost } from "@/interfaces.ts"; // Assuming interfaces.ts exists

interface BlogPost {
  slug: string;
  type: string;
  date: string;
  title: string;
  description: string;
  image: string;
  author: string;
  tags: string[];
  formattedDate?: string; // Optional, as it will be added later
}

interface BlogPostListProps {
  blogs: BlogPost[];
  trimDescription: (description: string) => string;
}

const BlogPostList = ({ blogs, trimDescription }: BlogPostListProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <li
          key={blog.slug}
          className="border px-3 py-2 rounded-xl cursor-pointer"
        >
          <LoaderLink isButton={false} url={`/blog/${blog.slug}`}>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-2xl font-bold">{blog.title}</h3>
                <div className="text-sm">{blog.formattedDate}</div>
              </div>
              <div title={blog.description}>
                {trimDescription(blog.description)}
              </div>
            </div>
          </LoaderLink>
        </li>
      ))}
    </ul>
  );
};

export default BlogPostList;
