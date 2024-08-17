import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";
// import aboutContent from "./about.mdx";
import { aboutContent } from "./about-content";
import MdxContent from "@/components/mdx/mdx-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MDX Blog | About",
  };
}

export default function About() {
  return (
    <div className="max-w-3xl z-10 w-full items-center justify-between">
      <div className="w-full flex justify-center items-center flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center pb-8">
          About <span className="primary-color">MDX</span>Blog
        </h1>
        <ReactMarkdown className="flex flex-col gap-6">
          {aboutContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
