import { CatelogPage } from "@/components/custome/catelog";
import SearchBar from "@/components/custome/search-bar";
import CategorySelector from "@/components/custome/category-selector";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-background py-10">
      <Container>
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

          {/* Catalog Grid & Pagination */}
          <CatelogPage />
        </div>
      </Container>
    </div>
  );
}
