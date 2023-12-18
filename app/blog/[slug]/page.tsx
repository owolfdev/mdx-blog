import fs from "fs";
import path from "path";
// import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code-component/code";
import { getPost } from "@/lib/posts-utils.mjs";
import Image from "next/image";
import ImageComponent from "@/components/mdx/image";

import { Button } from "@/components/ui/button";

import Link from "next/link";

// import { notFound } from "next/navigation";

import type { Metadata, ResolvingMetadata } from "next";
import EditPostButton from "./edit-post-button";
// import { Edit } from "lucide-react";
// import EditInVSCode from "@/components/post/edit-in-vs-code";

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
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
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
    ImageComponent,
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-5xl font-bold">{props.frontMatter.title}</h1>
        <div>{props.frontMatter.date}</div>
        <div>By: {props.frontMatter.author}</div>
      </div>
      <div className="flex gap-4">
        {/* <div>
          <Link href={`/blog/edit/${slug}`}>
            <Button>Edit Post</Button>
          </Link>
        </div> */}
        <EditPostButton slug={slug} author={props.frontMatter.author} />
        {/* <div>
          <EditInVSCode file={props.frontMatter.path as string} />
        </div> */}
      </div>
      <article className="mdx">
        <MDXRemote source={props.content} components={components} />
      </article>
    </div>
  );
}
