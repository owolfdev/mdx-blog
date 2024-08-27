import type React from "react";
import { getPosts } from "@/lib/posts/get-posts.mjs";
import Link from "next/link";

type RelatedPostsListProps = {
  relatedSlugs: string[];
};

const RelatedPostsList: React.FC<RelatedPostsListProps> = ({
  relatedSlugs,
}) => {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return null;
  }

  // Fetch all posts
  const { posts } = getPosts();

  // Filter posts to include only those that match the relatedSlugs
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const relatedPosts = posts.filter((post: any) =>
    relatedSlugs.includes(post.slug)
  );

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <hr className="pb-8" />
      <h3 className="text-xl font-bold mb-4">Related Posts</h3>
      <ul>
        {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
        {relatedPosts.map((post: any) => (
          <li key={post.slug} className="mb-2">
            <Link
              href={`/blog/${post.slug}`}
              passHref
              className="hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedPostsList;
