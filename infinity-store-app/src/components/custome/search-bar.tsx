"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDebounce } from "use-debounce";

import { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // get first search keyword (if page is refreshed)
  const startingSearchWord = searchParams.get("search") || "";

  // local state for search bar
  const [inputValue, setInputValue] = useState<string>(startingSearchWord);
  const [prevUrlSearch, setPrevUrlSearch] =
    useState<string>(startingSearchWord);

  // state for debounce
  const [debouncedValue] = useDebounce(inputValue, 500);

  // helper fun to safely update URL
  function pushNewSearchToUrl(newSearchWord: string) {
    // current URL
    // using built in browser method

    const currentParams = new URLSearchParams(searchParams.toString());

    //
    if (newSearchWord !== "") {
      currentParams.set("search", newSearchWord);
      currentParams.delete("category"); // clear category when searching
    } else {
      currentParams.delete("search");
    }

    // reset page to 1 after each search
    currentParams.set("page", "1");

    // now tel nextjs router to update browser's address bar
    // we manipulate url on code
    // but need to send it to browser search bar and then it can search new
    const newUrlString = currentParams.toString();
    router.push(`${pathname}?${newUrlString}`);
  }

  const currentUrlSearch = searchParams.get("search") || "";

  // 1. Sync external URL changes (e.g. clearing search via category) during render
  if (currentUrlSearch !== prevUrlSearch) {
    setPrevUrlSearch(currentUrlSearch);
    setInputValue(currentUrlSearch);
  }

  // 2. Push debounced input changes to URL
  useEffect(() => {
    const currentUrlSearch = searchParams.get("search") || "";
    // Only fire if the debounced value is completely synced with what the user is typing
    // AND it differs from the URL. This prevents stale debounced values from firing.
    if (debouncedValue !== currentUrlSearch && debouncedValue === inputValue) {
      pushNewSearchToUrl(debouncedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  // handle submit
  function handleSearchSubmit(e: SubmitEvent) {
    e.preventDefault();
    pushNewSearchToUrl(inputValue);
  }

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="flex w-full items-center gap-2">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <Input
            type="text"
            placeholder="Search for products..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="h-12 w-full rounded-full border-border/40 bg-card/60 pl-12 pr-4 text-base shadow-sm backdrop-blur-md focus-visible:ring-2 focus-visible:ring-primary/30"
          />
        </div>
        <Button className="h-12 rounded-full px-6 shadow-sm" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
