"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePickerField from "@/components/date-picker";
import { MultiSelect } from "@/components/rs-multi-select";

type Post = {
  id: string;
  type: string;
  author: string;
  title: string;
  date: string;
  description: string;
  content: string;
  categories: string[];
  tags: string;
  path: string;
};

// Define the schema for form validation using Zod
const formSchema = z.object({
  date: z.date(),
  type: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(15, { message: "Description must be at least 15 characters." }),
  content: z
    .string()
    .min(2, { message: "Content must be at least 2 characters." }),
  categories: z.array(z.string()).nonempty(),
  tags: z.string().optional(),
});

export function CreatePostForm({ post }: { post?: Post }) {
  const [selectedValue, setSelectedValue] = useState("blog");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: post || {
      date: new Date(),
      type: "blog",
      title: "",
      description: "",
      content: "",
      categories: ["Web Development"],
      tags: "",
    },
  });
  const authorName = "O Wolfson";
  const router = useRouter();

  // Handle form submission
  async function onSubmit(values: any) {
    // const endpoint = post ? "/api/update-file" : "/api/save-file-locally";
    // const submissionData = {
    //   ...values,
    //   author: authorName,
    //   id: post ? post.id : uuidv4(),
    // };
    // try {
    //   const response = await fetch(endpoint, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(submissionData),
    //   });
    //   if (!response.ok) throw new Error("Network response was not ok");
    //   const result = await response.json();
    //   console.log("Success:", result);
    //   form.reset();
    //   router.push(`/blog/${result.filePath}`);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  }

  // Handle file deletion
  async function handleDelete() {
    try {
      const response = await fetch("/api/delete-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: post?.path }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      console.log("File deleted successfully");
      router.push("/home");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  return (
    <div className="pb-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Post Type Field */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={selectedValue}
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
          {/* Date Field */}
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
          {/* <Button type="submit">{post ? "Update" : "Create"}</Button> */}
          {/* {post && <Button onClick={handleDelete}>Delete</Button>} */}
        </form>
      </Form>
    </div>
  );
}
