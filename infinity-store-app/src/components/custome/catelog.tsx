import React from "react";
import Container from "../ui/container";
import SearchBar from "./search-bar";
import CategorySelector from "./category-selector";
import CatelogCard from "./catelog-card";

export const CatelogPage = () => {
  // Generate dummy array for UI placeholder cards
  const dummyProducts = Array.from({ length: 8 });

  return (
    <div className="min-h-screen bg-background py-10">
      <Container variant="default">
        <div className="flex flex-col gap-8">
          
          {/* Header Section */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Discover Products
            </h1>
            <p className="max-w-xl text-muted-foreground">
              Explore our wide range of premium collections handpicked just for you.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <SearchBar />
          </div>
          
          <div className="w-full">
            <CategorySelector />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dummyProducts.map((_, idx) => (
              <CatelogCard key={idx} />
            ))}
          </div>

        </div>
      </Container>
    </div>
  );
};
