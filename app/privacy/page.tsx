import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
import MdxContent from "./mdx-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MDXBlog | Privacy",
  };
}

export default function About() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          Privacy
        </h1>
        <MdxContent slug="privacy" />
      </div>
    </div>
  );
}
