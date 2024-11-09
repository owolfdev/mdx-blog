"use client";

import React from "react";
import { DatePicker } from "@/components/date-picker";
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
import { Checkbox } from "@/components/ui/checkbox";
import authorsData from "@/settings/authors.json"; // Import authors data
import categoriesData from "@/settings/categories.json";

// Form schema validation using Zod
const formSchema = z.object({
  date: z.date(),
  type: z.string().nonempty({ message: "Post type is required" }),
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
  image: z.string().nullable().optional().or(z.literal("")), // Allow empty string
  relatedPosts: z.string().optional(),
  draft: z.boolean().optional(), // Add draft to the form schema
  author: z.string().nonempty({ message: "Author is required" }), // Add author to the schema
  link: z.string().optional(), // Add an optional external link field
});

export function CreatePostForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      type: "",
      title: "",
      description: "",
      content: "",
      categories: [categoriesData.categories[0]],
      tags: "",
      image: "",
      relatedPosts: "",
      draft: false, // Default to false
      author: authorsData.authors[0], // Default to the first author
      link: "", // Default to empty string
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submissionData = {
      ...values,
      id: uuidv4(),
      modifiedDate: new Date().toISOString(), // Current date as modifiedDate
      relatedPosts: values.relatedPosts,
      // values.relatedPosts && typeof values.relatedPosts === "string"
      //   ? values.relatedPosts.split(",").map((post) => post.trim())
      //   : [], // Ensure it's an array or default to an empty array
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
        {/* Author Selection Field */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px] input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px] input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
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

        {/* Date Picker Field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-md">Date</FormLabel>
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
                <Input
                  placeholder="Title"
                  {...field}
                  className="input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 dark:focus:ring-black"
                />
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
                <Textarea
                  placeholder="Description"
                  {...field}
                  className="input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 dark:focus:ring-black"
                />
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
                  className="h-[300px] input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 dark:focus:ring-black"
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
                  categories={categoriesData.categories} // Pass categories as prop
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
                  className="input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 dark:focus:ring-black"
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
                  className="input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 dark:focus:ring-black"
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
                  placeholder="Enter external link URL or local link"
                  {...field}
                  value={field.value || ""}
                  className="input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 dark:focus:ring-black"
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
                  className="input-no-zoom text-lg sm:text-sm border-border dark:border-white dark:border-opacity-70 placeholder-gray-500 dark:placeholder-white dark:placeholder-opacity-50 dark:focus:ring-black"
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
                <span className=" opacity-50">
                  (draft will not be published)
                </span>
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="text-lg dark:bg-white dark:text-background dark:hover:bg-opacity-95"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
