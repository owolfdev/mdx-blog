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

  useEffect(() => {
    if (hasMounted) {
      changeSort();
    } else {
      setHasMounted(true);
    }
  }, [sortBy, sortOrder]);

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
    <div className="w-1/2 sm:w-1/3 flex gap-2 items-center">
      {sortOrder === "asc" ? (
        <ChevronUp className="cursor-pointer" onClick={toggleSortOrder} />
      ) : (
        <ChevronDown className="cursor-pointer" onClick={toggleSortOrder} />
      )}
      <div className="w-full">
        <Select value={sortBy} onValueChange={handleChangeSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="likes">Likes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SortPosts;
