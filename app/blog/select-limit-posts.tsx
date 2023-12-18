"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SelectLimitPosts({
  postsPerPage,
  currentPage,
  searchTerm,
  numBlogs,
  sort,
}: {
  postsPerPage: number;
  currentPage: number;
  searchTerm: string;
  numBlogs: number;
  sort: string;
}) {
  const [localPostsPerPage, setLocalPostsPerPage] = useState(postsPerPage);

  const router = useRouter();

  const searchParams = useSearchParams();
  let limit = searchParams.get("limit");

  useEffect(() => {
    if (limit === null) {
      if (postsPerPage !== 10) {
        limit = postsPerPage.toString();
      } else {
        limit = "10";
      }
    }
    // console.log("searchParams", searchParams);
    // console.log("limit", limit);
    const limitFromUrl = parseInt(limit as string);
    if (!isNaN(limitFromUrl) && limitFromUrl !== localPostsPerPage) {
      setLocalPostsPerPage(limitFromUrl);
    }
  }, [searchParams, postsPerPage]);

  useEffect(() => {
    // console.log("numBlogs", numBlogs, "sort", sort);
    if (numBlogs && numBlogs === 0) {
      // alert(`No blogs found ${numBlogs}`);
      router.push(
        `/blog?limit=${localPostsPerPage}&page=${1}${
          searchTerm ? `&search=${searchTerm}` : ""
        }${sort !== "date_desc" ? `&sort=${sort}` : ""}`
      );
    } else {
      // alert(`Blogs found", ${numBlogs}`);
      router.push(
        `/blog?limit=${localPostsPerPage}&page=${currentPage}${
          searchTerm ? `&search=${searchTerm}` : ""
        }${sort !== "date_desc" ? `&sort=${sort}` : ""}`
      );
    }
  }, [numBlogs, sort, localPostsPerPage]);

  // Function to handle selection change
  const handlePostsPerPageChange = (newLimit: number) => {
    setLocalPostsPerPage(newLimit);
    //setLimit(newLimit); // Update the URL parameter, if applicable
    // You might need to fetch posts again here or it could be handled by a useEffect
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
