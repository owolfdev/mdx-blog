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

// Utility function to parse and format the date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Utility function to extract the first value from a string or array
function getFirstValue(param: string | string[] | undefined): string {
  return Array.isArray(param) ? param[0] : param || "";
}

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // Ensure searchParams is processed asynchronously
  const params = await searchParams;

  const currentPage = Number(getFirstValue(params.page)) || 1;
  const postsPerPage = Number(getFirstValue(params.limit)) || 10;
  const searchTerm = getFirstValue(params.search);
  const category = getFirstValue(params.category);
  const sort = getFirstValue(params.sort) || "date_desc";

  // Fetch posts with the specified parameters
  const { posts, totalPosts } = await getPosts({
    type: "blog",
    limit: postsPerPage,
    page: currentPage,
    searchTerm,
    sort,
    category,
  });

  // Format the publishDate for each post
  const formattedPosts = posts.map((post) => ({
    ...post,
    formattedDate: formatDate(post.publishDate),
  }));

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";

  const isDateDesc = sort === "date_desc";

  // Utility function to trim the description to a word limit
  function trimDescription(description: string) {
    const wordLimit = 20;
    const words = description.split(" ");

    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")}...`;
    }
    return description;
  }

  return (
    <div className="flex flex-col max-w-3xl w-full gap-8 pt-10">
      <div className="flex gap-4 justify-between items-center pb-0 pt-4">
        <SearchPosts limit={postsPerPage} sort={sort} category={category} />
        <SortPosts
          sort={sort}
          currentPage={currentPage}
          limit={postsPerPage}
          searchTerm={searchTerm}
          category={category}
        />
      </div>
      <div>
        {posts.length === 0 ? (
          <div className="text-center text-lg flex flex-col justify-evenly ">
            <span className="pb-[100px] pt-[100px]">
              No blog posts found on this page...
            </span>
          </div>
        ) : (
          <BlogPostList
            blogs={formattedPosts.map((post) => ({
              ...post,
              date: post.publishDate,
              image: post.image || "", // Ensure image is always a string
            }))}
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
                href={`/blog?limit=${postsPerPage}&page=1${
                  searchTerm ? `&search=${searchTerm}` : ""
                }${category ? `&category=${category}` : ""}${
                  !isDateDesc ? `&sort=${sort}` : ""
                }`}
              >
                {"<<"}
              </Link>
            </span>
          )}
          {isPreviousDisabled ? (
            <span className={`${disabledLinkStyle}`}>Previous</span>
          ) : (
            <Link
              className=""
              href={`/blog?limit=${postsPerPage}&page=${currentPage - 1}${
                searchTerm ? `&search=${searchTerm}` : ""
              }${category ? `&category=${category}` : ""}${
                !isDateDesc ? `&sort=${sort}` : ""
              }`}
            >
              Previous
            </Link>
          )}

          <span>- {`Page ${currentPage} of ${totalPages}`} -</span>

          {isNextDisabled ? (
            <span className={`${disabledLinkStyle}`}>Next</span>
          ) : (
            <Link
              className=""
              href={`/blog?limit=${postsPerPage}&page=${currentPage + 1}${
                searchTerm ? `&search=${searchTerm}` : ""
              }${category ? `&category=${category}` : ""}${
                !isDateDesc ? `&sort=${sort}` : ""
              }`}
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
                }${category ? `&category=${category}` : ""}${
                  !isDateDesc ? `&sort=${sort}` : ""
                }`}
              >
                {">>"}
              </Link>
            </span>
          )}
        </div>
        <SelectLimitPosts
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          searchTerm={searchTerm}
          numBlogs={posts.length}
          sort={sort}
          category={category}
        />
      </div>
    </div>
  );
};

export default Blog;
