import ReactMarkdown from "react-markdown";
import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "./form";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import Link from "next/link";

// Define the metadata generation function
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MDXBlog  | Contact",
  };
}

export default function Blog() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          Contact
        </h1>

        <div className="w-full">
          <ContactForm />
        </div>
        {isDevMode() && (
          <div className="flex justify-center">
            <div>
              <Link href="/contact/messages" className="underline">
                see contact messages.
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
