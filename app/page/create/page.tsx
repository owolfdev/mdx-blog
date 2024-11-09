import { CreatePageForm } from "./create-page-form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CreatePost() {
  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col max-w-3xl w-full gap-8 pt-10">
        <h1 className="text-6xl font-black">Create a Page</h1>
        <CreatePageForm />
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
  );
}
