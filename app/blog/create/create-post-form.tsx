"use client";

import React, { useState, useEffect } from "react";

import { generatePostsCache } from "@/lib/posts-utils.mjs";

import { useUser } from "@clerk/nextjs";

import { v4 as uuidv4 } from "uuid";

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

import { useRouter } from "next/navigation";

const formSchema = z.object({
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

export function CreatePostForm() {
  const [selectedValue, setSelectedValue] = useState("blog");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "blog",
      title: "",
      description: "",
      content: "",
      categories: ["Development"],
      tags: "",
    },
  });

  const { user } = useUser(); // Retrieve user information
  const authorName = user ? user.fullName : "Anonymous"; // Replace 'fullName' with the appropriate field

  const router = useRouter();

  useEffect(() => {
    console.log("user:", user);
  }, [user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Endpoint URL where you want to send the POST request
    const endpoint = "/api/save-file-locally"; // Replace with your actual API route

    // Add the author data to the submission values
    const submissionData = {
      ...values,
      author: authorName,
      id: uuidv4(),
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

      router.push(`/blog/${result}`); // Redirect to the blog page

      // Handle success scenario (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenario (e.g., show an error message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Type</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Input placeholder="Enter tags (comma separated)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
