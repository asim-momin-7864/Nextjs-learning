import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchBar = () => {
  return (
    <div className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search for products..."
          className="h-12 w-full rounded-full border-border/40 bg-card/60 pl-12 pr-4 text-base shadow-sm backdrop-blur-md focus-visible:ring-2 focus-visible:ring-primary/30"
        />
      </div>
      <Button className="h-12 rounded-full px-6 shadow-sm">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
