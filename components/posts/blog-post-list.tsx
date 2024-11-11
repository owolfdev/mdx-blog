import Link from "next/link";
import LoaderLink from "@/components/nav/custom-link";

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
    <ul className="flex flex-col gap-8">
      {blogs.map((blog) => (
        <li key={blog.slug} className="border-none sm:border rounded-lg py-4 ">
          <Link href={`/blog/${blog.slug}`}>
            <div className="flex flex-col gap-0">
              <h3 className="font-black text-4xl sm:text-5xl">{blog.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-sm">{blog.formattedDate}</p>
                <p className="text-sm rounded-lg px-2 py-1  m-2">
                  Likes: {blog.likes}
                </p>
              </div>
              <p className="font-light">{trimDescription(blog.description)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogPostList;
