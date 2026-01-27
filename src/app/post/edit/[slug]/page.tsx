import React from "react";
import { EditPostForm } from "./edit-post-form";
import { getPost } from "@/app/actions/posts/get-post";
import type { Post } from "@/types/post-types";
import RepoBehindAlert from "@/components/dev/repo-behind-alert";

async function EditBlog({ params }: { params: Promise<{ slug: string }> }) {
  const postData = await getPost({ slug: (await params).slug });

  if ("notFound" in postData && postData.notFound) {
    return <div>Post not found</div>; // Handle not found case
  }

  const post = postData as Post; // Type assertion to Post

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#eef5ff] to-[#fff8e6] px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex w-full flex-col gap-8">
          <RepoBehindAlert />
          <h1 className="text-6xl font-black">Edit Post</h1>
          <p className="w-full text-2xl">
            Post title: <span className="font-bold">{post.metadata.title}</span>
          </p>
          <EditPostForm postData={post} />
        </div>
      </div>
    </div>
  );
}

export default EditBlog;
