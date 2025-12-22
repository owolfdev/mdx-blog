import Link from "next/link";
import SelectLimitPosts from "@/components/posts/select-limit-posts";
import SearchPosts from "@/components/posts/search-posts";
import SortPosts from "@/components/posts/sort-posts";
import { getPosts } from "@/app/actions/posts/get-posts";
import BlogPostList from "@/components/posts/blog-post-list";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
  };
}

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

function getFirstValue(param: string | string[] | undefined): string {
  return Array.isArray(param) ? param[0] : param || "";
}

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const currentPage = Number(getFirstValue(params.page)) || 1;
  const postsPerPage = Number(getFirstValue(params.limit)) || 10;
  const searchTerm = getFirstValue(params.search);
  const category = getFirstValue(params.category);
  const sort = getFirstValue(params.sort) || "date_desc";

  const { posts, totalPosts } = await getPosts({
    type: "blog",
    limit: postsPerPage,
    page: currentPage,
    searchTerm,
    sort,
    category,
  });

  const formattedPosts = posts.map((post) => ({
    ...post,
    formattedDate: formatDate(post.publishDate),
  }));

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";
  const isDateDesc = sort === "date_desc";

  function trimDescription(description: string) {
    const wordLimit = 20;
    const words = description.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...`
      : description;
  }

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
            <SearchPosts limit={postsPerPage} sort={sort} category={category} />
            <SortPosts
              sort={sort}
              currentPage={currentPage}
              limit={postsPerPage}
              searchTerm={searchTerm}
              category={category}
            />
          </div>
        </div>
      </section>

      <section
        className="site-container py-16 md:py-20"
        aria-label="Blog post list"
      >
        {posts.length === 0 ? (
          <p className="text-center text-lg text-muted-foreground py-24">
            No blog posts found on this page...
          </p>
        ) : (
          <BlogPostList
            blogs={formattedPosts.map((post) => ({
              ...post,
              date: post.publishDate,
              image: post.image || "",
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
          {currentPage === 1 ? (
            <span className={disabledLinkStyle}>{"<<"}</span>
          ) : (
            <Link
              href={`/blog?limit=${postsPerPage}&page=1${searchTerm ? `&search=${searchTerm}` : ""}${category ? `&category=${category}` : ""}${!isDateDesc ? `&sort=${sort}` : ""}`}
            >
              {"<<"}
            </Link>
          )}

          {isPreviousDisabled ? (
            <span className={disabledLinkStyle}>Previous</span>
          ) : (
            <Link
              href={`/blog?limit=${postsPerPage}&page=${currentPage - 1}${searchTerm ? `&search=${searchTerm}` : ""}${category ? `&category=${category}` : ""}${!isDateDesc ? `&sort=${sort}` : ""}`}
            >
              Previous
            </Link>
          )}

          <span className="text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          {isNextDisabled ? (
            <span className={disabledLinkStyle}>Next</span>
          ) : (
            <Link
              href={`/blog?limit=${postsPerPage}&page=${currentPage + 1}${searchTerm ? `&search=${searchTerm}` : ""}${category ? `&category=${category}` : ""}${!isDateDesc ? `&sort=${sort}` : ""}`}
            >
              Next
            </Link>
          )}

          {currentPage === totalPages ? (
            <span className={disabledLinkStyle}>{">>"}</span>
          ) : (
            <Link
              href={`/blog?limit=${postsPerPage}&page=${totalPages}${searchTerm ? `&search=${searchTerm}` : ""}${category ? `&category=${category}` : ""}${!isDateDesc ? `&sort=${sort}` : ""}`}
            >
              {">>"}
            </Link>
          )}
        </nav>
      </section>

      <section className="site-container pb-16" aria-label="Limit selector">
        <SelectLimitPosts
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          searchTerm={searchTerm}
          numBlogs={posts.length}
          sort={sort}
          category={category}
        />
      </section>
    </main>
  );
};

export default Blog;
