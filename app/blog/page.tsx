import Link from "next/link";
import SelectLimitPosts from "./select-limit-posts";
import SearchPosts from "./search-posts";
import SortPosts from "./sort-posts";
import { getPosts } from "@/lib/posts-utils.mjs";
import LoaderLink from "@/components/nav/loader-link";

import BlogPostList from "./blog-post-list";
import BlogPostGrid from "./blog-post-grid";

import CachePostsButton from "@/components/admin/cache-posts-button";

interface BlogPost {
  slug: string;
  type: string;
  date: string;
  title: string;
  description: string;
  image: string;
  author: string;
  tags: string[];
  formattedDate?: string; // Optional, as it will be added later
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
  const sort = searchParams.sort || "date_desc";

  // const defaultButton = buttonVariants({ variant: "default", size: "default" });

  //filter by type, page, limit
  const { posts: blogs, totalPosts } = getPosts(
    "blog",
    postsPerPage,
    currentPage,
    searchTerm,
    sort as string
  );

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  //button disabled styles
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const disabledLinkStyle = "opacity-50 cursor-not-allowed";

  const isDateDesc = sort === "date_desc";

  // Utility function to trim description
  function trimDescription(description: string) {
    const wordLimit = 10;
    const words = description.split(" ");

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    } else {
      return description;
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-6">
      {/* <h1 className="text-4xl sm:text-5xl font-bold text-center">Blog</h1> */}
      <div>
        <CachePostsButton />
      </div>
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
          <BlogPostList blogs={blogs} trimDescription={trimDescription} />
          // <ul className="flex flex-col gap-4">
          //   {blogs.map((blog: BlogPost) => (
          //     <li
          //       key={blog.slug}
          //       className=" border px-3 py-2 rounded-xl cursor-pointer"
          //     >
          //       <LoaderLink isButton={false} url={`/blog/${blog.slug}`}>
          //         <div className="">
          //           <h3 className="text-2xl font-bold">{blog.title}</h3>
          //           <div className="text-sm">{blog.formattedDate}</div>
          //           <div title={blog.description}>
          //             {trimDescription(blog.description)}
          //           </div>
          //         </div>
          //       </LoaderLink>
          //     </li>
          //   ))}
          // </ul>
          // )}
        )}
        {/* pagination */}
        <div
          id="pagination"
          className="flex gap-2 pt-8 pb-2 items-center justify-center"
        >
          {currentPage === 1 ? (
            <span className={`${disabledLinkStyle}`}>{`<<`}</span>
          ) : (
            <span>
              <Link
                href={`/blog?limit=${postsPerPage}&page=${1}${
                  searchTerm ? `&search=${searchTerm}` : ""
                }${!isDateDesc ? `&sort=${sort}` : ""}`}
              >{`<<`}</Link>
            </span>
          )}
          {isPreviousDisabled ? (
            <span className={`${disabledLinkStyle}`}>Previous</span>
          ) : (
            <Link
              className={``}
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
              className={``}
              href={`/blog?limit=${postsPerPage}&page=${currentPage + 1}${
                searchTerm ? `&search=${searchTerm}` : ""
              }${!isDateDesc ? `&sort=${sort}` : ""}`}
            >
              Next
            </Link>
          )}
          {currentPage === totalPages ? (
            <span className={`${disabledLinkStyle}`}>{`>>`}</span>
          ) : (
            <span>
              <Link
                href={`/blog?limit=${postsPerPage}&page=${totalPages}${
                  searchTerm ? `&search=${searchTerm}` : ""
                }${!isDateDesc ? `&sort=${sort}` : ""}`}
              >{`>>`}</Link>
            </span>
          )}
        </div>
        {/* New component for selecting posts per page */}
        <SelectLimitPosts
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          searchTerm={searchTerm as string}
          numBlogs={blogs.length}
          sort={sort as string}
        />
        {/* pagination end */}
      </div>
      {/* <div>
        <PushNavigator blogs={blogs} />
      </div> */}
    </div>
  );
};

export default Blog;
