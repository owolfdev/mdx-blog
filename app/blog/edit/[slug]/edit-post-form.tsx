"use client";

import React, { useState, useEffect } from "react";

import { parseISO } from "date-fns";

import { useRouter } from "next/navigation";

import DatePickerField from "@/components/date-picker";
import { format } from "date-fns";

// import CachePostsButton from "@/components/admin/cache-posts-button";

import { generatePostsCache } from "@/lib/posts-utils.mjs";

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

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { MultiSelect } from "@/components/rs-multi-select";

const formSchema = z.object({
  date: z.date(),
  type: z.string().optional(),
  title: z.string().min(3, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(15, {
    message: "Description must be at least 15 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
  categories: z.array(z.string()).nonempty(),
  tags: z.string().optional(),
});

export function EditPostForm({ postData }: { postData: any }) {
  const [selectedValue, setSelectedValue] = useState("blog");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: postData.frontMatter.date
        ? parseISO(postData.frontMatter.date)
        : new Date(),
      type: postData.frontMatter.type,
      title: postData.frontMatter.title,
      description: postData.frontMatter.description,
      content: postData.content.trim(),
      categories: postData.frontMatter.categories,
      tags: postData.frontMatter.tags
        ? postData.frontMatter.tags.join(", ")
        : "",
    },
  });

  // Retrieve user information

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Endpoint URL where you want to send the POST request
    const endpoint = "/api/edit-file-locally"; // Replace with your actual API route

    const formattedDate = values.date ? format(values.date, "yyyy-MM-dd") : "";

    // Add the author data to the submission values
    const submissionData = {
      ...values,
      author: postData.frontMatter.author,
      id: postData.frontMatter.id,
      savedFilename: postData.frontMatter.path,
      date: formattedDate,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);

      // Reset the form here
      form.reset();

      const slug = postData.frontMatter.path.replace(/\.mdx$/, "");

      //redirect to the post page
      router.push(`/blog/${slug}`);
      router.refresh();

      // Handle success scenario (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenario (e.g., show an error message)
    }
  }

  const handleOpenInVSCode = async () => {
    fetch("/api/open-in-vs-code", {
      method: "POST",
      body: JSON.stringify(`data/posts/${postData.frontMatter.path}`),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/settings");
  };

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
          {/* date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold text-md">Date</FormLabel>
                <DatePickerField field={field} />
                {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
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
          {/* categories - multi-select */}
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>categories</FormLabel>
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
          <div className="flex gap-3">
            <Button type="submit">Save Edits</Button>
            <Button type="button" onClick={handleOpenInVSCode}>
              Open File In VS Code
            </Button>
          </div>
        </form>
      </Form>
      {/* <CachePostsButton /> */}
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button
              variant="destructive"
              type="button"
              // onClick={handleDeletePost}
            >
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
          <div className="grid gap-4 py-4"></div>
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

      {/* <div>{JSON.stringify(postData.frontMatter)}</div> */}
    </>
  );
}
