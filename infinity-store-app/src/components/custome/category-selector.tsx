import React from "react";
import { categoryArray } from "@/constants/constants";
import { Button } from "../ui/button";

const CategorySelector = () => {
  return (
    <div className="w-full overflow-x-auto pb-2 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex w-max items-center gap-2 px-1">
        <Button 
          variant="default" 
          className="rounded-full shadow-sm"
        >
          All
        </Button>
        {categoryArray.map((category) => (
          <Button 
            key={category} 
            variant="outline" 
            className="capitalize rounded-full bg-card/60 backdrop-blur-md border-border/40 shadow-sm hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {category.replace(/-/g, " ")}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
