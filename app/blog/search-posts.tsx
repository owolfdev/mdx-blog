"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, useCallback, useEffect, useRef } from "react";
import debounce from "lodash/debounce";

const SearchPosts = ({ limit, sort }: { limit: number; sort: string }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Define the search function
  const searchForTerm = useCallback(
    (searchTerm: string) => {
      router.push(
        `/blog?limit=${limit}&page=1${
          searchTerm ? `&search=${searchTerm}` : ""
        }${sort !== "date_desc" ? `&sort=${sort}` : ""}`
      );
    },
    [limit, sort, router]
  );

  // useRef to keep a stable reference to the debounced function
  const debouncedSearch = useRef(
    debounce((searchTerm: string) => {
      searchForTerm(searchTerm);
    }, 500)
  );

  // Ensure the debounced function uses the latest searchForTerm
  useEffect(() => {
    debouncedSearch.current = debounce((searchTerm: string) => {
      searchForTerm(searchTerm);
    }, 500);
  }, [searchForTerm]);

  // Handle changes in the search input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    debouncedSearch.current(searchTerm);
  };

  // Submit the search form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchForTerm(inputValue);
  };

  // Click handler to focus the input
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
