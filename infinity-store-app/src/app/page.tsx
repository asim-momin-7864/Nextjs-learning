"use client";

import { CatelogPage } from "@/components/custome/catelog";
import SearchBar from "@/components/custome/search-bar";
import CategorySelector from "@/components/custome/category-selector";
import Container from "@/components/ui/container";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/ues-products";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import CatelogPagination from "@/components/custome/catelog-pagination";

export default function Home() {
  // search params
  const searchParams = useSearchParams();

  // read url params
  const searchWord = searchParams.get("search") || undefined;
  const categoryWord = searchParams.get("category") || undefined;

  // read page number
  const pageString = searchParams.get("page");
  const currentPage = pageString ? Number(pageString) : 1;

  // convert slip into pages
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  // call hook
  const { data, isPending, isError } = useProducts({
    search: searchWord,
    category: categoryWord,
    limit: limit,
    skip: skip,
  });

  // calculation for pagination component
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / limit);

  // error handler
  if (isError) {
    return (
      <Container variant="narrow">
        <Alert
          variant="destructive"
          className="max-w-md mx-auto my-4 flex justify-center items-center"
        >
          <AlertCircleIcon />
          <AlertTitle>Error loading products</AlertTitle>
          <AlertDescription>
            Something went wrong while loading products. Please try again later.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <Container>
        <div className="flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Discover Products
            </h1>
            <p className="max-w-xl text-muted-foreground">
              Explore our wide range of premium collections handpicked just for
              you.
            </p>
          </div>
          {/* Search & Filters */}
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <SearchBar />
          </div>
          <div className="w-full">
            <CategorySelector />
          </div>
          {/* Catalog Grid & Pagination */}
          <CatelogPage products={data?.products} isPending={isPending} />
          <CatelogPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </Container>
    </div>
  );
}
