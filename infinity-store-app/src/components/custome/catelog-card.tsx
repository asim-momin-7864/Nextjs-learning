import React from "react";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { ProductType } from "@/lib/schemas/product";
import { Skeleton } from "../ui/skeleton";
import ProductSheet from "./product-sheet";

// CatelogCardProp types
interface CatelogCardPropsType {
  product: ProductType;
  isPending: boolean;
}

const CatelogCard = (params: CatelogCardPropsType) => {
  const { product, isPending } = params;

  // on loading show skeleton
  if (isPending) {
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  return (
    <ProductSheet product={product}>
      <Card className="flex flex-col h-full overflow-hidden border-border/40 bg-card/60 backdrop-blur-md transition-all hover:shadow-xs cursor-pointer group">
        {/* Product Image Placeholder */}
        <div className="relative aspect-square w-full bg-muted/50 overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 rounded-full bg-primary/20 px-2 py-1 text-xs font-semibold backdrop-blur-md">
            ${product.price}
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="font-normal">
              {product.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span>{product.rating}</span>
            </div>
          </div>
          <CardTitle className="line-clamp-1 text-lg">
            {product.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button className="w-full gap-2 rounded-full pointer-events-none">
            <ShoppingCart className="h-4 w-4" />
            View Details
          </Button>
        </CardFooter>
      </Card>
    </ProductSheet>
  );
};

export default CatelogCard;
