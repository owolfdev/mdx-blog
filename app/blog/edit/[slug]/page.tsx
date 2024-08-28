import React from "react";
import { EditPostForm } from "./edit-post-form";
import { getPost } from "@/lib/posts/get-post";
import type { Post } from "@/types/post-types";

async function EditBlog({ params }: { params: { slug: string } }) {
  const postData = await getPost({ slug: params.slug });

  if ("notFound" in postData && postData.notFound) {
    return <div>Post not found</div>; // Handle not found case
  }

  const post = postData as Post; // Type assertion to Post

  return (
    <div className="flex flex-col gap-8 pb-6 w-full max-w-3xl sm:max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          Edit Post
        </h1>
        <p className="w-full text-center text-3xl font-bold">
          {post.metadata.title}
        </p>
        <EditPostForm postData={post} />
      </div>
    </div>
  );
}

export default EditBlog;
