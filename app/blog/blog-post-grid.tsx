import Link from "next/link";
import AbstractArt from "@/components/graphics/abstract-image";

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

interface BlogPostGridProps {
  blogs: BlogPost[];
  trimDescription: (description: string) => string;
}

const BlogPostGrid = ({ blogs, trimDescription }: BlogPostGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {blogs.map((blog) => (
        <div key={blog.slug} className="border p-3 rounded-xl cursor-pointer">
          <Link href={`/blog/${blog.slug}`}>
            <div className=" flex flex-col gap-4">
              <div>
                {" "}
                <h3 className="text-2xl font-bold">{blog.title}</h3>
                <div className="text-sm">{blog.formattedDate}</div>
              </div>
              <div className="w-full aspect-video overflow-hidden">
                <AbstractArt />
              </div>
              <div title={blog.description}>
                {trimDescription(blog.description)}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogPostGrid;
