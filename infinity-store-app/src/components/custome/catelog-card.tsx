import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const CatelogCard = () => {
  return (
    <Card className="flex flex-col h-full overflow-hidden border-border/40 bg-card/60 backdrop-blur-md transition-all hover:shadow-xs">
      {/* Product Image Placeholder */}
      <div className="relative aspect-square w-full bg-muted/50">
        <img
          src="https://dummyjson.com/image/400x400/cccccc/ffffff?text=Product+Image"
          alt="Product"
          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded-full bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur-md">
          $99.99
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="font-normal">
            Category
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span>4.5</span>
          </div>
        </div>
        <CardTitle className="line-clamp-1 text-lg">
          Product Title Here
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs">
          This is a brief description of the product that spans across a maximum
          of two lines before truncating.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-1">
        {/* Any extra details can go here if needed, but flex-1 pushes footer down */}
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Button className="w-full gap-2 rounded-full">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CatelogCard;
