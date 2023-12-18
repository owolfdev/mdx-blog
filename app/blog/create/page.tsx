import { CreatePostForm } from "./create-post-form";

export default function Admin() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">
        Create a Post
      </h1>
      <CreatePostForm />
    </div>
  );
}
