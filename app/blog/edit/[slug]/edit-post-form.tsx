"use client";

import React from "react";
// import fs from "node:fs";
// import path from "node:path";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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

import DatePickerField from "@/components/date-picker";

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
  image: z
    .string()
    .url({ message: "Invalid URL format." })
    .nullable()
    .optional()
    .or(z.literal("")), // Allow empty string
  relatedPosts: z.string().optional(),
  draft: z.boolean().optional(),
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function EditPostForm({ postData }: { postData: any }) {
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
      categories: Array.isArray(postData.metadata?.category)
        ? postData.metadata.category
        : [],
      tags: postData.metadata?.tags ? postData.metadata.tags.join(", ") : "",
      image: postData.metadata?.image || "",
      relatedPosts: postData.metadata?.relatedPosts
        ? postData.metadata.relatedPosts.join(", ")
        : "",
      draft: postData.metadata?.draft || false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedDate = values.date ? format(values.date, "yyyy-MM-dd") : "";

    const submissionData = {
      ...values,
      author: postData.metadata?.author || "",
      id: postData.metadata?.id || "",
      originalFilename: postData.filename,
      filename: `${values.slug}.mdx`, // Use the new slug to determine the filename
      date: formattedDate,
    };

    try {
      const result = await editPostAction(submissionData, false);

      if (result.ok) {
        // Use the new slug from the result to redirect
        console.log("Redirecting to:", `/blog/${result.newSlug}`);
        // alert(`Redirecting to: /blog/${result.newSlug}`);

        window.location.href = `/blog/${result.newSlug}`;
        // router.push(`/blog/${result.newSlug}`);
        // router.refresh();
      } else {
        if (result.status === 409) {
          form.setError("slug", {
            type: "manual",
            message: result.error,
          });

          // Show an alert to the user
          alert(result.error);
        } else {
          throw new Error("Failed to save post");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleDeletePost = async () => {
    try {
      const result = await deletePostAction(postData);

      if (!result.ok) {
        throw new Error("Failed to delete post");
      }

      // Optionally refresh the cache after deletion
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
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold text-md">Date</FormLabel>
                <DatePickerField field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <MultiSelect
                    selectedCategories={field.value}
                    setSelectedCategories={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          {/* New Image URL field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter image URL"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* New Related Posts field */}
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
          {/* New Draft Checkbox field */}
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
