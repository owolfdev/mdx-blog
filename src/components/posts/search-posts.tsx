"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, useCallback, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

const SearchPosts = ({
  limit,
  sort,
  category = "", // Ensure category is passed as a prop with default value
  basePath = "/blog",
  initialSearchTerm = "",
}: {
  limit: number;
  sort: string;
  category?: string;
  basePath?: string;
  initialSearchTerm?: string;
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(initialSearchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchForTerm = useCallback(
    (searchTerm: string) => {
      router.push(
        `${basePath}?limit=${limit}&page=1${
          searchTerm ? `&search=${searchTerm}` : ""
        }${category ? `&category=${category}` : ""}${
          sort !== "date_desc" ? `&sort=${sort}` : ""
        }`
      );
    },
    [limit, sort, category, basePath, router]
  );

  const debouncedSearch = useRef(
    debounce((searchTerm: string) => {
      searchForTerm(searchTerm);
    }, 500)
  );

  useEffect(() => {
    debouncedSearch.current = debounce((searchTerm: string) => {
      searchForTerm(searchTerm);
    }, 500);
  }, [searchForTerm]);

  useEffect(() => {
    setInputValue(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    debouncedSearch.current(searchTerm);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchForTerm(inputValue);
  };

  return (
    <div className="flex w-full items-center gap-3">
      <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          ref={inputRef}
          type="text"
          name="searchTerm"
          placeholder="Search posts"
          value={inputValue}
          onChange={handleChange}
          className="h-11 text-sm font-medium"
        />
      </form>
    </div>
  );
};

export default SearchPosts;
