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

export const CatelogPage = () => {
  // Generate dummy array for UI placeholder cards
  const dummyProducts = Array.from({ length: 8 });

  return (
    <div className="flex flex-col gap-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dummyProducts.map((_, idx) => (
          <CatelogCard key={idx} />
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
