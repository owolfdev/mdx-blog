import { getPosts } from "@/app/actions/posts/get-posts";
import BlogIndexClient from "@/components/posts/blog-index-client";
import { shouldUseGithubSource } from "@/lib/posts/mdx-storage";
import type { Metadata } from "next";

const useGithubSource = shouldUseGithubSource();
export const dynamic = useGithubSource ? "force-dynamic" : "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
  };
}

const Blog = async () => {
  const { posts } = await getPosts({ type: "blog" });
  return <BlogIndexClient posts={posts} />;
};

export default Blog;
