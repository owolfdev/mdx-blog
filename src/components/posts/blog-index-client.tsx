"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchPosts from "@/components/posts/search-posts";
import SortPosts from "@/components/posts/sort-posts";
import SelectLimitPosts from "@/components/posts/select-limit-posts";
import BlogPostList from "@/components/posts/blog-post-list";

type Post = {
  slug: string;
  type: string;
  title: string;
  author: string;
  publishDate: string;
  description: string;
  categories: string[];
  tags: string[];
  image?: string | null;
  likes?: number;
  formattedDate?: string;
};

type Props = {
  posts: Post[];
  basePath?: string;
  defaultCategory?: string;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime())
    ? "Invalid Date"
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

function trimDescription(description: string) {
  const wordLimit = 20;
  const words = description.split(" ");
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : description;
}

function getFirstValue(value: string | null): string {
  return value ?? "";
}

export default function BlogIndexClient({
  posts,
  basePath = "/blog",
  defaultCategory = "",
}: Props) {
  const searchParams = useSearchParams();

  const currentPage = Number(getFirstValue(searchParams.get("page"))) || 1;
  const postsPerPageRaw = Number(getFirstValue(searchParams.get("limit")));
  const postsPerPage = postsPerPageRaw > 0 ? postsPerPageRaw : 10;
  const searchTerm = getFirstValue(searchParams.get("search"));
  const category =
    getFirstValue(searchParams.get("category")) || defaultCategory;
  const sort = getFirstValue(searchParams.get("sort")) || "date_desc";

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (searchTerm.trim() !== "") {
      const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean);

      result = result.filter((post) => {
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (Array.isArray(post.tags) &&
            searchWords.some((word) =>
              post.tags.some((tag) => tag.toLowerCase() === word)
            )) ||
          (Array.isArray(post.categories) &&
            post.categories.some((cat) =>
              cat.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        );
      });
    }

    if (category.trim() !== "") {
      result = result.filter(
        (post) =>
          Array.isArray(post.categories) &&
          post.categories.some((cat) =>
            cat.toLowerCase().includes(category.toLowerCase())
          )
      );
    }

    const [sortBy, sortOrder] = sort.split("_");

    result.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.publishDate).getTime();
        const dateB = new Date(b.publishDate).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }

      if (sortBy === "likes") {
        const likesA = a.likes || 0;
        const likesB = b.likes || 0;
        return sortOrder === "asc" ? likesA - likesB : likesB - likesA;
      }

      return 0;
    });

    return result;
  }, [posts, searchTerm, category, sort]);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const currentPageClamped = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (currentPageClamped - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(start, start + postsPerPage);

  const isPreviousDisabled = currentPageClamped <= 1;
  const isNextDisabled = currentPageClamped >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";
  const isDateDesc = sort === "date_desc";

  return (
    <main className="flex w-full flex-col" aria-label="Main content">
      <section className="border-b border-border bg-muted/20">
        <div className="site-container flex flex-col gap-8 py-16 md:py-20">
          <header className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              MDXBlog
            </span>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              The MDXBlog
            </h1>
            <p className="text-base font-medium text-foreground/80 sm:text-lg">
              Tutorials, product notes, and MDX publishing stories.
            </p>
          </header>

          <div
            className="flex flex-col gap-4 md:flex-row"
            aria-label="Search and sort controls"
          >
            <SearchPosts
              limit={postsPerPage}
              sort={sort}
              category={category}
              basePath={basePath}
            />
            <SortPosts
              sort={sort}
              currentPage={currentPageClamped}
              limit={postsPerPage}
              searchTerm={searchTerm}
              category={category}
              basePath={basePath}
            />
          </div>
        </div>
      </section>

      <section
        className="site-container py-16 md:py-20"
        aria-label="Blog post list"
      >
        {paginatedPosts.length === 0 ? (
          <p className="text-center text-lg text-muted-foreground py-24">
            No blog posts found on this page...
          </p>
        ) : (
          <BlogPostList
            blogs={paginatedPosts.map((post) => ({
              ...post,
              date: post.publishDate,
              image: post.image || "",
              formattedDate: post.formattedDate ?? formatDate(post.publishDate),
            }))}
            trimDescription={trimDescription}
          />
        )}
      </section>

      <section className="site-container pb-10" aria-label="Pagination">
        <nav
          id="pagination"
          className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold uppercase tracking-[0.2em]"
        >
          {currentPageClamped === 1 ? (
            <span className={disabledLinkStyle}>{"<<"}</span>
          ) : (
            <Link
              href={`${basePath}?limit=${postsPerPage}&page=1${
                searchTerm ? `&search=${searchTerm}` : ""
              }${category ? `&category=${category}` : ""}${
                !isDateDesc ? `&sort=${sort}` : ""
              }`}
            >
              {"<<"}
            </Link>
          )}

          {isPreviousDisabled ? (
            <span className={disabledLinkStyle}>Previous</span>
          ) : (
            <Link
              href={`${basePath}?limit=${postsPerPage}&page=${
                currentPageClamped - 1
              }${
                searchTerm ? `&search=${searchTerm}` : ""
              }${category ? `&category=${category}` : ""}${
                !isDateDesc ? `&sort=${sort}` : ""
              }`}
            >
              Previous
            </Link>
          )}

          <span className="text-muted-foreground">
            Page {currentPageClamped} of {totalPages}
          </span>

          {isNextDisabled ? (
            <span className={disabledLinkStyle}>Next</span>
          ) : (
            <Link
              href={`${basePath}?limit=${postsPerPage}&page=${
                currentPageClamped + 1
              }${
                searchTerm ? `&search=${searchTerm}` : ""
              }${category ? `&category=${category}` : ""}${
                !isDateDesc ? `&sort=${sort}` : ""
              }`}
            >
              Next
            </Link>
          )}

          {currentPageClamped === totalPages ? (
            <span className={disabledLinkStyle}>{">>"}</span>
          ) : (
            <Link
              href={`${basePath}?limit=${postsPerPage}&page=${totalPages}${
                searchTerm ? `&search=${searchTerm}` : ""
              }${category ? `&category=${category}` : ""}${
                !isDateDesc ? `&sort=${sort}` : ""
              }`}
            >
              {">>"}
            </Link>
          )}
        </nav>
      </section>

      <section className="site-container pb-16" aria-label="Limit selector">
        <SelectLimitPosts
          postsPerPage={postsPerPage}
          currentPage={currentPageClamped}
          searchTerm={searchTerm}
          numBlogs={paginatedPosts.length}
          sort={sort}
          category={category}
          basePath={basePath}
        />
      </section>
    </main>
  );
}
