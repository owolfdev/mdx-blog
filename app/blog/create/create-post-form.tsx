"use client";

import React from "react";
import DatePickerField from "@/components/date-picker";
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
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/rs-multi-select";
import { useRouter } from "next/navigation";
import { createNewPostAction } from "@/app/actions/create-new-post-action";
import { Checkbox } from "@/components/ui/checkbox"; // Import the Checkbox component

// Form schema validation using Zod
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
  image: z
    .string()
    .url({ message: "Invalid URL format." })
    .nullable()
    .optional()
    .or(z.literal("")), // Allow empty string
  relatedPosts: z.string().optional(),
  draft: z.boolean().optional(), // Add draft to the form schema
});

export function CreatePostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      type: "blog",
      title: "",
      description: "",
      content: "",
      categories: ["Web Development"],
      tags: "",
      image: "",
      relatedPosts: "",
      draft: false, // Default to false
    },
  });

  const authorName = "O Wolfson"; // Replace 'fullName' with the appropriate field
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submissionData = {
      ...values,
      author: authorName,
      id: uuidv4(),
      modifiedDate: new Date().toISOString(), // Current date as modifiedDate
      relatedPosts:
        values.relatedPosts?.split(",").map((post) => post.trim()) ?? [], // Convert to array of strings
    };

    try {
      const slug = await createNewPostAction(submissionData);

      form.reset();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for a short period to ensure the file is saved and cache is regenerated
      router.push(`/blog/${slug}`); // Redirect to the blog page with the correct slug
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Existing form fields */}
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
                <Input placeholder="Enter tags (comma separated)" {...field} />
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
        <div className="pt-4">
          <Button type="submit" className="text-lg">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
