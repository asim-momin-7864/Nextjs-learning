import React from "react";
import { categoryArray } from "@/constants/constants";
import { Button } from "../ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { categoryEnumType } from "@/lib/schemas/product";

const CategorySelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // read current category form url
  const activeCategory = searchParams.get("category") || "";

  const handleSelectCategory = (category: categoryEnumType | "") => {
    // take current URL params
    const params = new URLSearchParams(searchParams.toString());

    //
    if (category === "" || category === activeCategory) {
      params.delete("category");
      // to avoid refetch same
    } else {
      params.set("category", category);
      params.delete("search"); // clear search when selecting category
    }

    // reset page
    params.set("page", "1");

    // push new URL
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full overflow-x-auto pb-2 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex w-max items-center gap-2 px-1">
        {/* "All" button */}
        <Button
          variant={activeCategory === "" ? "default" : "outline"}
          className="rounded-full shadow-xs"
          onClick={() => handleSelectCategory("")}
        >
          All
        </Button>

        {categoryArray.map((category) => {
          // isSeletec
          const isSelected = activeCategory === category;

          return (
            <Button
              key={category}
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleSelectCategory(category)}
              className="capitalize rounded-full shadow-xs transition-colors"
            >
              {category.replace(/-/g, " ")}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
