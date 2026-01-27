import { CreatePostForm } from "./create-post-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import RepoBehindAlert from "@/components/dev/repo-behind-alert";

export default function CreatePost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1e8] via-[#eef5ff] to-[#fff8e6] px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex w-full flex-col gap-8">
          <RepoBehindAlert />
          <h1 className="text-6xl font-black">Create a Post</h1>
          <CreatePostForm />
        </div>
        <div className="pt-6">
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/blog"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
