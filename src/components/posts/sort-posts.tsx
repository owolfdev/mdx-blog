"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react"; // Make sure to import these icons

function SortPosts({
  sort,
  currentPage,
  limit,
  searchTerm,
  category = "", // Ensure category is passed as a prop with default value
}: {
  sort: string;
  currentPage: number;
  limit: number;
  searchTerm: string;
  category?: string;
}) {
  const [sortOrder, setSortOrder] = useState(sort.split("_")[1]);
  const [sortBy, setSortBy] = useState(sort.split("_")[0]);
  const [hasMounted, setHasMounted] = useState(false);

  const router = useRouter();

  const changeSort = () => {
    const theSort = `${sortBy}_${sortOrder}`;
    const isDateDesc = theSort === "date_desc";
    router.push(
      `/blog?limit=${limit}&page=${currentPage}${
        searchTerm ? `&search=${searchTerm}` : ""
      }${category ? `&category=${category}` : ""}${
        !isDateDesc ? `&sort=${theSort}` : ""
      }`
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (hasMounted) {
      changeSort();
    } else {
      setHasMounted(true);
    }
  }, [sortBy, sortOrder]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (sort !== `${sortBy}_${sortOrder}`) {
      setSortBy(sort.split("_")[0]);
      setSortOrder(sort.split("_")[1]);
    }
  }, [sort]);

  const handleChangeSort = (newSort: string) => {
    setSortBy(newSort);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex w-full items-center gap-3 md:w-64">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
        onClick={toggleSortOrder}
        aria-label="Toggle sort order"
      >
        {sortOrder === "asc" ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      <Select value={sortBy} onValueChange={handleChangeSort}>
        <SelectTrigger className="h-11">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="likes">Likes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortPosts;
