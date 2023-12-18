import React from "react";
import { EditPostForm } from "./edit-post-form";
import { getPost } from "@/lib/posts-utils.mjs";

async function EditBlog({ params }: { params: { slug: string } }) {
  const postData = await getPost(params);
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">Edit Post</h1>
      <EditPostForm postData={postData} />
    </div>
  );
}

export default EditBlog;
