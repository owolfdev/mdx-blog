import React from "react";
import { EditPostForm } from "./edit-post-form";
import { getPost } from "@/lib/posts-utils.mjs";

async function EditBlog({ params }: { params: { slug: string } }) {
  const postData = await getPost(params);

  if (postData.notFound) {
    return <div>Post not found</div>; // Handle not found case
  }

  return (
    <div className="flex flex-col gap-8 pb-6 w-full max-w-3xl sm:max-w-3xl">
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          Edit Post
        </h1>
        <EditPostForm postData={postData} />
      </div>
    </div>
  );
}

export default EditBlog;
