import React from "react";
import { EditPostForm } from "./edit-post-form";
import { getPost } from "@/app/actions/posts/get-post";
import type { Post } from "@/types/post-types";

async function EditBlog({ params }: { params: Promise<{ slug: string }> }) {
  const postData = await getPost({ slug: (await params).slug });

  if ("notFound" in postData && postData.notFound) {
    return <div>Post not found</div>; // Handle not found case
  }

  const post = postData as Post; // Type assertion to Post

  return (
    <div className="flex flex-col gap-8 pb-6 w-full max-w-3xl sm:max-w-3xl">
      <div className="flex flex-col max-w-3xl w-full gap-8 pt-10">
        <h1 className="text-6xl font-black">Edit Post</h1>
        <p className="w-full text-2xl">
          Post title: <span className="font-bold">{post.metadata.title}</span>
        </p>
        <EditPostForm postData={post} />
      </div>
    </div>
  );
}

export default EditBlog;
