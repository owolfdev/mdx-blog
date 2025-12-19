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
    <main
      className="flex flex-col max-w-3xl w-full gap-8 pt-10"
      aria-label="Main content"
    >
      <header
        className="flex gap-4 justify-between items-center pb-0 pt-4"
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
      </header>

      <section aria-label="Blog post list">
        {posts.length === 0 ? (
          <p className="text-center text-lg py-24">
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

      <nav
        id="pagination"
        className="flex gap-2 pt-8 pb-2 items-center justify-center"
        aria-label="Pagination"
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

        <span>- {`Page ${currentPage} of ${totalPages}`} -</span>

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

      <section aria-label="Limit selector">
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
