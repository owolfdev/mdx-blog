"use client";

import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdxPostEditor } from "@/components/mdx/mdx-post-editor";
import { useToast } from "@/hooks/use-toast";
import { createPost } from "@/app/actions/posts/create-post";
import type { MdxPostMetadata } from "@/types/mdx-post";
import {
  extractMetadataBlock,
  formatMetadataBlock,
  slugify,
  stripMetadataBlock,
} from "@/lib/posts/mdx-storage";

const starterContent = `export const metadata = {
  id: "",
  type: "blog",
  title: "Untitled post",
  author: "",
  publishDate: "",
  description: "",
  categories: [],
  tags: [],
  modifiedDate: "",
  image: null,
  draft: false,
  relatedPosts: [],
};

# New MDX Post

Start writing your MDX content here.
`;

const defaultMetadata = (): MdxPostMetadata => {
  const today = new Date();
  const publishDate = today.toISOString().split("T")[0];
  return {
    id: uuidv4(),
    type: "blog" as const,
    title: "Untitled post",
    author: "Unknown",
    publishDate,
    description: "",
    categories: [] as string[],
    tags: [] as string[],
    modifiedDate: today.toISOString(),
    image: null as string | null,
    draft: false,
    relatedPosts: [] as string[],
    link: null as string | null,
  };
};

const parseString = (block: string, key: string) => {
  const match = new RegExp(
    `${key}\\s*:\\s*(?:"([^"]*)"|'([^']*)')`,
    "m"
  ).exec(block);
  return match?.[1] ?? match?.[2];
};

const parseBoolean = (block: string, key: string) => {
  const match = new RegExp(`${key}\\s*:\\s*(true|false)`, "m").exec(block);
  return match ? match[1] === "true" : undefined;
};

const parseArray = (block: string, key: string) => {
  const match = new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`, "m").exec(
    block
  );
  if (!match) {
    return undefined;
  }
  const values: string[] = [];
  const regex = /"([^"]*)"|'([^']*)'/g;
  let token: RegExpExecArray | null;
  while ((token = regex.exec(match[1])) !== null) {
    const value = token[1] ?? token[2];
    if (value?.trim()) {
      values.push(value.trim());
    }
  }
  return values;
};

const parseMetadataFromContent = (
  content: string,
  base: ReturnType<typeof defaultMetadata>
) => {
  const match = content.match(
    /export\\s+const\\s+metadata\\s*=\\s*{([\\s\\S]*?)}\\s*;/m
  );

  if (!match) {
    return base;
  }

  const block = match[1];
  const id = parseString(block, "id");
  const type = parseString(block, "type");
  const title = parseString(block, "title");
  const author = parseString(block, "author");
  const publishDate = parseString(block, "publishDate");
  const description = parseString(block, "description");
  const categories = parseArray(block, "categories");
  const tags = parseArray(block, "tags");
  const modifiedDate = parseString(block, "modifiedDate");
  const imageMatch = new RegExp("image\\s*:\\s*(null|\"[^\"]*\")", "m").exec(
    block
  );
  const image =
    imageMatch?.[1] === "null"
      ? null
      : imageMatch?.[1]?.replace(/"/g, "");
  const draft = parseBoolean(block, "draft");
  const relatedPosts = parseArray(block, "relatedPosts");

  return {
    ...base,
    id: id && id.trim() ? id : base.id,
    type: type === "project" ? "project" : base.type,
    title: title && title.trim() ? title : base.title,
    author: author && author.trim() ? author : base.author,
    publishDate: publishDate && publishDate.trim() ? publishDate : base.publishDate,
    description: description ?? base.description,
    categories: categories ?? base.categories,
    tags: tags ?? base.tags,
    modifiedDate: modifiedDate && modifiedDate.trim() ? modifiedDate : base.modifiedDate,
    image: image === undefined ? base.image : image,
    draft: draft ?? base.draft,
    relatedPosts: relatedPosts ?? base.relatedPosts,
  };
};

export function CreatePostForm() {
  const [content, setContent] = useState(starterContent);
  const [isSaving, setIsSaving] = useState(false);
  const [showMetadata, setShowMetadata] = useState(true);
  const [slugInput, setSlugInput] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const baseMetadata = useMemo<MdxPostMetadata>(() => defaultMetadata(), []);
  const metadata = useMemo<MdxPostMetadata>(
    () => parseMetadataFromContent(content, baseMetadata),
    [content, baseMetadata]
  );

  const handleEditorChange = (next: string) => {
    if (showMetadata) {
      setContent(next);
      return;
    }
    const block = extractMetadataBlock(content) ?? formatMetadataBlock(metadata);
    const body = next.replace(/^\n+/, "");
    setContent(`${block}\n\n${body}`);
  };

  const visibleContent = useMemo(
    () => (showMetadata ? content : stripMetadataBlock(content)),
    [content, showMetadata]
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const post = await createPost({
        metadata,
        content,
        slug: slugInput || undefined,
      });
      toast({
        title: "Post saved",
        description: `Saved ${post.slug} to the database.`,
      });
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Save failed",
        description:
          error instanceof Error ? error.message : "Unable to save post.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="post-slug"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Slug
        </label>
        <Input
          id="post-slug"
          placeholder="Leave blank to auto-generate from title"
          value={slugInput}
          onChange={(event) => setSlugInput(slugify(event.target.value))}
        />
      </div>
      <MdxPostEditor
        value={visibleContent}
        onChange={handleEditorChange}
        showMetadataToggle
        showMetadata={showMetadata}
        onToggleMetadata={setShowMetadata}
        metadataStorageKey="mdx-editor-show-metadata"
      />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Using metadata from the MDX content when present.
        </p>
        <Button type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
