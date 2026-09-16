import React from "react";
import CatelogCard from "./catelog-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import type { ProductType } from "@/lib/schemas/product";
import { Skeleton } from "../ui/skeleton";

// prop type
interface CatelogPagePropsType {
  products: ProductType[] | undefined;
  isPending: boolean;
}

export const CatelogPage = (props: CatelogPagePropsType) => {
  const products = props.products;
  const isPending = props.isPending;

  // on loading show , skeleton loader
  if (isPending) {
    const fakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fakeArray.map((num) => (
          <Skeleton key={num} className="h-[350px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  // if products load
  // but no search found
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products found. Try a different search.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <CatelogCard
            key={product.id}
            product={product}
            isPending={isPending}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center pb-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
