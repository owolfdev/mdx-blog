"use client";

import React, { useState } from "react";
import { parseISO, format } from "date-fns";
import { useRouter } from "next/navigation";
import DatePickerField from "@/components/date-picker";
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

const formSchema = z.object({
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
});

export function EditPostForm({ postData }: { postData: any }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const endpoint = "/api/edit-file-locally";
    const formattedDate = values.date ? format(values.date, "yyyy-MM-dd") : "";

    const submissionData = {
      ...values,
      author: postData.metadata?.author || "",
      id: postData.metadata?.id || "",
      filename: postData.filename,
      slug: postData.slug,
      date: formattedDate,
    };

    console.log("submissionData!!!", submissionData);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...submissionData, openInVSCode: false }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);

      // form.reset();

      const slug = postData.filename.replace(/\.mdx$/, "");

      // Navigate to the edited blog post
      router.push(`/blog/${slug}`);
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleDeletePost = async () => {
    await fetch("/api/delete-post", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetch("/api/cache-posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/blog");
    router.refresh();
    console.log("delete post");
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <div className="flex items-center gap-3 pt-4">
            <Button type="submit">Save Edits</Button>
            <Link
              className={buttonVariants({ variant: "outline", size: "lg" })}
              href={`/blog/${postData.slug}`}
            >
              Cancel
            </Link>
            {/* <div>{JSON.stringify(postData)}</div> */}
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
