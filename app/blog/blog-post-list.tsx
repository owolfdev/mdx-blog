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
  likes: number;
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
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <Link href={`/blog/${blog.slug}`}>
            <div className="flex flex-col gap-0">
              <h3 className="font-bold text-2xl">{blog.title}</h3>
              <div className="flex justify-between items-center">
                <p className="">{blog.formattedDate}</p>
                <p className="text-sm border-2 rounded-lg px-2 py-1 bg-muted m-2">
                  Likes: {blog.likes}
                </p>
              </div>
              <p className="text-muted-foreground">
                {trimDescription(blog.description)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BlogPostList;
