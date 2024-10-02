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
}: {
  limit: number;
  sort: string;
  category?: string;
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const searchForTerm = useCallback(
    (searchTerm: string) => {
      router.push(
        `/blog?limit=${limit}&page=1${
          searchTerm ? `&search=${searchTerm}` : ""
        }${category ? `&category=${category}` : ""}${
          sort !== "date_desc" ? `&sort=${sort}` : ""
        }`
      );
    },
    [limit, sort, category, router]
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    debouncedSearch.current(searchTerm);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchForTerm(inputValue);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex gap-2 items-center w-1/2 sm:w-2/3">
      <div className="icon-container">
        <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <Input
            ref={inputRef}
            type="text"
            name="searchTerm"
            placeholder="Search"
            value={inputValue}
            onChange={handleChange}
            onClick={handleClick}
            className="text-lg sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchPosts;
