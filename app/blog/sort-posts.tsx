"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

function SortPosts({
  sort,
  currentPage,
  limit,
  searchTerm,
}: {
  sort: string;
  currentPage: number;
  limit: number;
  searchTerm: string;
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
      }${!isDateDesc ? `&sort=${theSort}` : ""}`
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (hasMounted) {
      changeSort();
    } else {
      setHasMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (sort !== `${sortBy}_${sortOrder}`) {
      setSortBy(sort.split("_")[0]);
      setSortOrder(sort.split("_")[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className=" w-full">
        <Select value={sortBy} onValueChange={handleChangeSort}>
          <SelectTrigger className="">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent
            ref={(ref) => {
              if (!ref) return;
              ref.ontouchstart = (e) => {
                e.preventDefault();
              };
            }}
          >
            <SelectItem value="date">
              <span className="sm:text-sm text-lg">Date</span>
            </SelectItem>
            <SelectItem value="title">
              <span className="sm:text-sm text-lg">Title</span>
            </SelectItem>
            <SelectItem value="likes">
              <span className="sm:text-sm text-lg">Likes</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SortPosts;
