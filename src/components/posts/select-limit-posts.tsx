"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SelectLimitPosts({
  postsPerPage,
  currentPage,
  searchTerm,
  numBlogs,
  sort,
  category = "", // Ensure category is passed as a prop with default value
}: {
  postsPerPage: number;
  currentPage: number;
  searchTerm: string;
  numBlogs: number;
  sort: string;
  category?: string;
}) {
  const [localPostsPerPage, setLocalPostsPerPage] = useState(postsPerPage);

  const router = useRouter();
  const searchParams = useSearchParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let limit = searchParams.get("limit");
    if (limit === null) {
      limit = postsPerPage !== 10 ? postsPerPage.toString() : "10";
    }
    const limitFromUrl = Number.parseInt(limit as string);
    if (!Number.isNaN(limitFromUrl) && limitFromUrl !== localPostsPerPage) {
      setLocalPostsPerPage(limitFromUrl);
    }
  }, [searchParams, postsPerPage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (numBlogs === 0) {
      router.push(
        `/blog?limit=${localPostsPerPage}&page=1${
          searchTerm ? `&search=${searchTerm}` : ""
        }${category ? `&category=${category}` : ""}${
          sort !== "date_desc" ? `&sort=${sort}` : ""
        }`
      );
    } else {
      router.push(
        `/blog?limit=${localPostsPerPage}&page=${currentPage}${
          searchTerm ? `&search=${searchTerm}` : ""
        }${category ? `&category=${category}` : ""}${
          sort !== "date_desc" ? `&sort=${sort}` : ""
        }`
      );
    }
  }, [numBlogs, sort, localPostsPerPage]);

  const handlePostsPerPageChange = (newLimit: number) => {
    setLocalPostsPerPage(newLimit);
  };

  return (
    <div>
      <div className="text-center">
        <label htmlFor="postsPerPage">Posts per page:</label>
        <select
          id="postsPerPage"
          value={localPostsPerPage}
          onChange={(e) => handlePostsPerPageChange(Number(e.target.value))}
          className="mx-2 rounded-md border border-gray-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
}

export default SelectLimitPosts;
