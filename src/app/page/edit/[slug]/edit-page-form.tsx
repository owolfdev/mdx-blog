"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { useRouter } from "next/navigation";
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
import { editPageAction } from "@/app/actions/pages/edit-page-action";
import type { Page } from "@/types/page-types";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(15, { message: "Description must be at least 15 characters." }),
  content: z
    .string()
    .min(2, { message: "Content must be at least 2 characters." }),
});

export function EditPageForm({ pageData }: { pageData: Page }) {
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: pageData.metadata?.title || "",
      description: pageData.metadata?.description || "",
      content: pageData.content?.trim() || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const submissionData = {
      ...values,
      slug: pageData.slug, // Use the existing slug
      originalFilename: pageData.filename,
      filename: `${pageData.slug}.mdx`,
    };

    try {
      const result = await editPageAction(submissionData, false);

      if (result.ok) {
        window.location.href = `/${result.newSlug}`; // Redirect after edit
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Title</FormLabel>
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

        {/* Save and Cancel Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <Button type="submit">Save Edits</Button>
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href={`/${pageData.slug}`}
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
}
