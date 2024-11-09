"use client";

import React from "react";
import { parseISO, format } from "date-fns";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/rs-multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cachePostsAction } from "@/app/actions/cache-actions";
import { deletePostAction } from "@/app/actions/delete-post-action";
import { editPostAction } from "@/app/actions/edit-post-action";
import { DatePicker } from "@/components/date-picker";
import type { Post } from "@/types/post-types";
import categoriesData from "@/settings/categories.json";
import authorsData from "@/settings/authors.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Define the schema for the form using Zod
const formSchema = z.object({
  slug: z.string().min(1, {
    message: "Slug is required.",
  }),
  date: z.date(),
  type: z.string().optional(),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .refine((value) => !/"/.test(value), {
      message: "Title cannot contain double quotes.",
    }),
  description: z
    .string()
    .min(15, {
      message: "Description must be at least 15 characters.",
    })
    .refine((value) => !/"/.test(value), {
      message: "Description cannot contain double quotes.",
    }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
  categories: z.array(z.string()).nonempty(),
  tags: z.string().optional(),
  image: z.string().nullable().optional(),
  relatedPosts: z.string().optional(),
  draft: z.boolean().optional(),
  author: z.string().min(1, {
    message: "Author is required.",
  }),
  link: z.string().nullable().optional(),
});

export function EditPostForm({ postData }: { postData: Post }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: postData.slug || "",
      date: postData.metadata?.publishDate
        ? parseISO(postData.metadata.publishDate)
        : new Date(),
      type: postData.metadata?.type || "",
      title: postData.metadata?.title || "",
      description: postData.metadata?.description || "",
      content: postData.content?.trim() || "",
      categories: Array.isArray(postData.metadata?.categories)
        ? postData.metadata.categories
        : [],
      tags: postData.metadata?.tags ? postData.metadata.tags.join(", ") : "",
      image: postData.metadata?.image || "",
      relatedPosts: postData.metadata?.relatedPosts
        ? postData.metadata.relatedPosts.join(", ")
        : "",
      draft: postData.metadata?.draft || false,
      author: postData.metadata?.author || authorsData.authors[0],
      link: postData.metadata?.link || "", // Default the link to empty string
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedDate = values.date ? format(values.date, "yyyy-MM-dd") : "";

    const submissionData = {
      ...values,
      type: values.type,
      author: values.author,
      id: postData.metadata?.id || "",
      originalFilename: postData.filename,
      filename: `${values.slug}.mdx`,
      date: formattedDate,
      relatedPosts: values.relatedPosts,
    };

    try {
      const result = await editPostAction(submissionData, false);

      if (result.ok) {
        window.location.href = `/blog/${result.newSlug}`;
      } else {
        if (result.status === 409) {
          form.setError("slug", {
            type: "manual",
            message: result.error,
          });

          alert(result.error);
        } else {
          throw new Error("Failed to save post");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Handle post deletion
  const handleDeletePost = async () => {
    try {
      const result = await deletePostAction(postData);

      if (!result.ok) {
        throw new Error("Failed to delete post");
      }

      await cachePostsAction();
      router.push("/blog");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Slug Field */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Field */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {authorsData.authors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post Type Field */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select post type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Date</FormLabel>
                <DatePicker />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content Field */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    id="content"
                    className="h-[300px]"
                    placeholder="Content"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categories Field */}
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <MultiSelect
                    categories={categoriesData.categories}
                    selectedCategories={field.value}
                    setSelectedCategories={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags Field */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tags (comma separated)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image URL Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter image URL or local image path"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* External Link Field */}
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter external Url or local link"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Related Posts Field */}
          <FormField
            control={form.control}
            name="relatedPosts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Posts</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter related post slugs (comma separated)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Draft Checkbox Field */}
          <FormField
            control={form.control}
            name="draft"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="pl-2 pb-1">
                  Save as Draft{" "}
                  <span className="text-muted-foreground">
                    (draft will not be published)
                  </span>
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Save and Cancel Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <Button type="submit">Save Edits</Button>
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href={`/blog/${postData.slug}`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </Form>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button variant="destructive" type="button">
              Delete Post
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the current post?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="w-full flex gap-4">
              <Button variant="destructive" onClick={handleDeletePost}>
                OK Delete Post
              </Button>
              <DialogClose className="bg-gray-300 text-black px-4 py-2 rounded">
                <span className="text-sm">No Cancel</span>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
