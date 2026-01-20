"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdxPostEditor } from "@/components/mdx/mdx-post-editor";
import { useToast } from "@/hooks/use-toast";
import { updatePost } from "@/app/actions/posts/update-post";
import type { Post } from "@/types/post-types";
import {
  extractMetadataBlock,
  formatMetadataBlock,
  slugify,
  stripMetadataBlock,
  upsertMetadataBlock,
} from "@/lib/posts/mdx-storage";

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
  base: Post["metadata"]
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
    type: type && type.trim() ? type : base.type,
    title: title && title.trim() ? title : base.title,
    author: author && author.trim() ? author : base.author,
    publishDate:
      publishDate && publishDate.trim() ? publishDate : base.publishDate,
    description: description ?? base.description,
    categories: categories ?? base.categories,
    tags: tags ?? base.tags,
    modifiedDate:
      modifiedDate && modifiedDate.trim() ? modifiedDate : base.modifiedDate,
    image: image === undefined ? base.image : image,
    draft: draft ?? base.draft,
    relatedPosts: relatedPosts ?? base.relatedPosts,
  };
};

export function EditPostForm({ postData }: { postData: Post }) {
  const [content, setContent] = useState(
    upsertMetadataBlock(postData.content?.trim() ?? "", postData.metadata)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [showMetadata, setShowMetadata] = useState(true);
  const [slugInput, setSlugInput] = useState(postData.slug);
  const router = useRouter();
  const { toast } = useToast();

  const metadata = useMemo(
    () => parseMetadataFromContent(content, postData.metadata),
    [content, postData.metadata]
  );

  const handleEditorChange = (next: string) => {
    if (showMetadata) {
      setContent(next);
      return;
    }
    const block =
      extractMetadataBlock(content) ?? formatMetadataBlock(metadata);
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
      const result = await updatePost({
        slug: postData.slug,
        nextSlug: slugInput,
        metadata: {
          ...metadata,
          modifiedDate: new Date().toISOString(),
        },
        content,
      });
      toast({
        title: "Post updated",
        description: `Saved ${result.slug} to the database.`,
      });
      if (result.slug !== postData.slug) {
        router.push(`/post/edit/${result.slug}`);
      } else {
        router.refresh();
      }
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
