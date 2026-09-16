"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// porps type
interface CatelogPaginationPropsType {
  currentPage: number;
  totalPages: number;
}

const CatelogPagination = (params: CatelogPaginationPropsType) => {
  const currentPage = params.currentPage;
  const totalPages = params.totalPages;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // helper func
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // check
  // The component used to hide itself if totalPages <= 1.
  // Now it will render, but the Previous/Next buttons will be disabled.

  return (
    <div>
      <div className="mt-8 flex justify-center pb-4">
        <Pagination>
          <PaginationContent className="gap-3">
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
                className={`rounded-full border-border/40 bg-card/60 backdrop-blur-md shadow-xs hover:bg-primary/10 hover:text-primary transition-colors ${
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>

            <PaginationItem className="flex h-10 items-center justify-center rounded-full border border-border/40 bg-card/60 px-6 text-sm font-medium text-muted-foreground shadow-xs backdrop-blur-md">
              Page{" "}
              <span className="mx-1 font-bold text-primary">{currentPage}</span>{" "}
              of {totalPages}
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? createPageUrl(currentPage + 1)
                    : "#"
                }
                className={`rounded-full border-border/40 bg-card/60 backdrop-blur-md shadow-xs hover:bg-primary/10 hover:text-primary transition-colors ${
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CatelogPagination;
