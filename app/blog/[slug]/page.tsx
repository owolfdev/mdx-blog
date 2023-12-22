import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code-component/code";
import { getPost } from "@/lib/posts-utils.mjs";
import Image from "@/components/mdx/image";
import type { Metadata, ResolvingMetadata } from "next";
import EditPostButton from "./edit-post-button";
import OpenInVSCode from "./open-in-vs-code-button";
import { isDevMode } from "@/lib/utils";
import matter from "gray-matter";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params);
  const title = post.frontMatter.title;
  const description = post.frontMatter.description;

  return {
    title: title,
    description: description,
    // add other metadata fields as needed
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("data/posts"));
  const params = [];

  for (const filename of files) {
    // Read the content of the file
    const fullPath = path.join("data/posts", filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Extract the front matter to get the date
    // Assuming you use gray-matter or a similar library to parse front matter
    const { data: frontMatter } = matter(fileContents);

    // Parse the date and compare with the current date
    const postDate = new Date(frontMatter.date);
    const currentDate = new Date();
    const isFuture = postDate > currentDate;

    // console.log(
    //   "postDate:",
    //   postDate,
    //   "currentDate:",
    //   currentDate,
    //   "post is future?:",
    //   isFuture
    // );

    // If the post date is in the past, add it to the params

    if (!isFuture) {
      params.push({ slug: filename.replace(".mdx", "") });
    }
  }

  // console.log("params!!!:", params);

  return params;
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const props = await getPost(params);

  const slug = params.slug;

  const components = {
    pre: Code,
    YouTube,
    Image,
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="text-5xl font-bold">{props.frontMatter.title}</h1>
        <div>{props.frontMatter.date}</div>
        <div>By: {props.frontMatter.author}</div>
      </div>
      {isDevMode() && (
        <div className="flex gap-2">
          <EditPostButton slug={slug} author={props.frontMatter.author} />
          <OpenInVSCode path={props.frontMatter.path} />
        </div>
      )}
      <div className="flex gap-4"></div>
      <article className="mdx">
        <MDXRemote source={props.content} components={components} />
      </article>
    </div>
  );
}
