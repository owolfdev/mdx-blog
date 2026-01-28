"use client";

import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MdxPostEditor } from "@/components/mdx/mdx-post-editor";
import { useToast } from "@/hooks/use-toast";
import { createPost } from "@/app/actions/posts/create-post";
import { generatePostDraft } from "@/app/actions/posts/generate-post-draft";
import type { MdxPostMetadata } from "@/types/mdx-post";
import {
  extractMetadataBlock,
  formatMetadataBlock,
  slugify,
  stripMetadataBlock,
} from "@/lib/posts/mdx-storage";

const starterBody = `# New MDX Post

Start writing your MDX content here.`;

const defaultMetadata = (): MdxPostMetadata => {
  const today = new Date();
  const publishDate = today.toISOString().split("T")[0];
  return {
    id: uuidv4(),
    type: "blog" as const,
    title: "",
    author: "",
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
  const baseMetadata = useMemo<MdxPostMetadata>(() => defaultMetadata(), []);
  const [content, setContent] = useState(() => {
    const block = formatMetadataBlock(baseMetadata);
    return `${block}\n\n${starterBody}`;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMetadata, setShowMetadata] = useState(true);
  const [slugInput, setSlugInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [createTitleAndSlug, setCreateTitleAndSlug] = useState(true);
  const [createContent, setCreateContent] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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

  const handleGenerate = async () => {
    if (!descriptionInput.trim()) {
      toast({
        title: "Description needed",
        description: "Add a short description before generating a draft.",
        variant: "destructive",
      });
      return;
    }

    if (!createTitleAndSlug && !createContent) {
      toast({
        title: "Nothing to generate",
        description: "Select at least one generation option.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const draft = await generatePostDraft({
        description: descriptionInput,
        createTitleAndSlug,
        createContent,
      });

      const nextMetadata: MdxPostMetadata = {
        ...baseMetadata,
        title:
          createTitleAndSlug && draft.title?.trim()
            ? draft.title.trim()
            : baseMetadata.title,
        description:
          createTitleAndSlug && draft.description?.trim()
            ? draft.description.trim()
            : createTitleAndSlug
              ? descriptionInput.trim()
              : baseMetadata.description,
        categories:
          createTitleAndSlug && Array.isArray(draft.categories)
            ? draft.categories.filter((item) => item.trim())
            : baseMetadata.categories,
        tags:
          createTitleAndSlug && Array.isArray(draft.tags)
            ? draft.tags.filter((item) => item.trim())
            : baseMetadata.tags,
        modifiedDate:
          createTitleAndSlug && draft.modifiedDate?.trim()
            ? draft.modifiedDate.trim()
            : baseMetadata.modifiedDate,
      };

      const metadataBlock = formatMetadataBlock(nextMetadata);
      const existingBody = stripMetadataBlock(content).trim();
      const nextBody =
        createContent && draft.content?.trim()
          ? draft.content.trim()
          : existingBody;
      const nextContent = nextBody
        ? `${metadataBlock}\n\n${nextBody}\n`
        : `${metadataBlock}\n\n`;

      setContent(nextContent);
      if (createTitleAndSlug) {
        const nextSlug = slugify(
          draft.slug || draft.title || descriptionInput || ""
        );
        if (nextSlug) {
          setSlugInput(nextSlug);
        }
      }
      setShowMetadata(true);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Generation failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to generate a draft from the description.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Describe the post
            </p>
            <p className="text-sm text-muted-foreground">
              Share a short description so the LLM can generate a starter draft.
            </p>
          </div>
          <Textarea
            value={descriptionInput}
            onChange={(event) => setDescriptionInput(event.target.value)}
            placeholder="Example: A practical guide to designing accessible dashboards for SaaS apps."
            rows={5}
          />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="create-title-slug"
                checked={createTitleAndSlug}
                onCheckedChange={(checked) =>
                  setCreateTitleAndSlug(checked === true)
                }
              />
              <Label htmlFor="create-title-slug">
                Create title and slug (on by default)
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="create-content"
                checked={createContent}
                onCheckedChange={(checked) =>
                  setCreateContent(checked === true)
                }
              />
              <Label htmlFor="create-content">
                Create content (off by default)
              </Label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Generation uses your OpenAI key and may take a few seconds.
            </p>
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={
                isGenerating ||
                !descriptionInput.trim() ||
                (!createTitleAndSlug && !createContent)
              }
            >
              {isGenerating ? "Generating..." : "Generate draft"}
            </Button>
          </div>
        </div>
      </div>
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
