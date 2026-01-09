import { getPosts } from "@/app/actions/posts/get-posts";
import BlogIndexClient from "@/components/posts/blog-index-client";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Code",
  };
}

const Code = async () => {
  const { posts } = await getPosts({ type: "blog" });
  return (
    <BlogIndexClient
      posts={posts}
      basePath="/code"
      defaultCategory="code"
      title="Code Repo"
      subtitle="Templates, Snippets, Apps"
      showPagination={false}
      showLimitSelector={false}
    />
  );
};

export default Code;
