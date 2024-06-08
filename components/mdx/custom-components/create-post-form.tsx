"use client";

import React, { useState } from "react";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const DatePickerField = ({ field }: { field: any }) => {
  const [date, setDate] = useState(field.value);

  return (
    <input
      type="date"
      value={date}
      onChange={(e) => {
        setDate(e.target.value);
        field.onChange(e.target.value);
      }}
    />
  );
};

export function CreatePostForm({ post }: { post?: Post }) {
  const [selectedValue, setSelectedValue] = useState("blog");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div className="pb-12">
      <form className="space-y-6">
        <FormField
          name="type"
          render={() => (
            <FormItem>
              <FormLabel>Post Type</FormLabel>
              <Select
                defaultValue={selectedValue}
                onValueChange={setSelectedValue}
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

        {/* <FormField
          name="date"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-md">Date</FormLabel>
              <DatePickerField field={{ value: date, onChange: setDate }} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="title"
          render={() => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="content"
          render={() => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  id="content"
                  className="h-[300px]"
                  placeholder="Content"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <MultiSelect
                  selectedCategories={["Web Development"]}
                  setSelectedCategories={() => {}}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Enter tags (comma separated)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{post ? "Update" : "Create"}</Button>
        {post && <Button>Delete</Button>} */}
      </form>
    </div>
  );
}
