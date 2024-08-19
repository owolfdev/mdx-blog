import Link from "next/link";
import SelectLimitPosts from "./select-limit-posts";
import SearchPosts from "./search-posts";
import SortPosts from "./sort-posts";
import { getPosts } from "@/lib/posts/get-posts.mjs";
import BlogPostList from "./blog-post-list";

interface BlogPost {
  slug: string;
  type: string;
  publishDate: string; // Update this to publishDate if that's the correct field
  title: string;
  description: string;
  image: string;
  author: string;
  tags: string[];
  formattedDate?: string; // Optional, as it will be added later
}

// Utility function to parse and format the date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Handle invalid date
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const Blog = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const postsPerPage =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;
  const searchTerm = searchParams.search || "";
  const sort = searchParams.sort || "date_desc"; // Ensure this defaults to date sorting

  const { posts: blogs, totalPosts } = getPosts(
    "blog",
    postsPerPage,
    currentPage,
    searchTerm,
    sort as string
  );

  const formattedBlogs = blogs.map((blog: BlogPost) => ({
    ...blog,
    formattedDate: formatDate(blog.publishDate),
  }));

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";

  const isDateDesc = sort === "date_desc";

  function trimDescription(description: string) {
    const wordLimit = 20;
    const words = description.split(" ");

    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")}...`;
    }
    return description;
  }

  return (
    <div className="flex flex-col gap-8 pb-6 w-full max-w-3xl sm:max-w-3xl">
      <div className="flex gap-4 justify-between items-center">
        <SearchPosts
          currentPage={currentPage}
          limit={postsPerPage}
          numBlogs={blogs.length}
          sort={sort as string}
        />
        <SortPosts
          sort={sort as string}
          currentPage={currentPage}
          limit={postsPerPage}
          searchTerm={searchTerm as string}
        />
      </div>
      <div>
        {blogs.length === 0 ? (
          <div className="text-center text-lg flex flex-col justify-evenly ">
            <span className="pb-[100px] pt-[100px]">
              No blog posts found on this page...
            </span>
          </div>
        ) : (
          <BlogPostList
            blogs={formattedBlogs}
            trimDescription={trimDescription}
          />
        )}

        <div
          id="pagination"
          className="flex gap-2 pt-8 pb-2 items-center justify-center"
        >
          {currentPage === 1 ? (
            <span className={`${disabledLinkStyle}`}>{"<<"}</span>
          ) : (
            <span>
              <Link
                href={`/blog?limit=${postsPerPage}&page=${1}${
                  searchTerm ? `&search=${searchTerm}` : ""
                }${!isDateDesc ? `&sort=${sort}` : ""}`}
              >
                {"<<"}
              </Link>
            </span>
          )}
          {isPreviousDisabled ? (
            <span className={`${disabledLinkStyle}`}>Previous</span>
          ) : (
            <Link
              className={""}
              href={`/blog?limit=${postsPerPage}&page=${currentPage - 1}${
                searchTerm ? `&search=${searchTerm}` : ""
              }${!isDateDesc ? `&sort=${sort}` : ""}`}
            >
              Previous
            </Link>
          )}

          <span>- {`Page ${currentPage} of ${totalPages}`} -</span>

          {isNextDisabled ? (
            <span className={`${disabledLinkStyle}`}>Next</span>
          ) : (
            <Link
              className={""}
              href={`/blog?limit=${postsPerPage}&page=${currentPage + 1}${
                searchTerm ? `&search=${searchTerm}` : ""
              }${!isDateDesc ? `&sort=${sort}` : ""}`}
            >
              Next
            </Link>
          )}
          {currentPage === totalPages ? (
            <span className={`${disabledLinkStyle}`}>{">>"}</span>
          ) : (
            <span>
              <Link
                href={`/blog?limit=${postsPerPage}&page=${totalPages}${
                  searchTerm ? `&search=${searchTerm}` : ""
                }${!isDateDesc ? `&sort=${sort}` : ""}`}
              >
                {">>"}
              </Link>
            </span>
          )}
        </div>
        <SelectLimitPosts
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          searchTerm={searchTerm as string}
          numBlogs={blogs.length}
          sort={sort as string}
        />
      </div>
    </div>
  );
};

export default Blog;
