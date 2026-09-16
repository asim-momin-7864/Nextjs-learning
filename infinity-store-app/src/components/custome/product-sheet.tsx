"use client";

import React from "react";
import Image from "next/image";
import { ProductType } from "@/lib/schemas/product";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Package,
  RotateCcw,
} from "lucide-react";

interface ProductSheetProps {
  product: ProductType;
  children: React.ReactNode;
}

export const ProductSheet = ({ product, children }: ProductSheetProps) => {
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <Sheet>
      <SheetTrigger render={<div className="h-full" />} nativeButton={false}>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto border-l border-border/40 bg-background/80 backdrop-blur-xl p-0">
        <div className="relative h-[40vh] min-h-[280px] w-full bg-secondary/30">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />
          <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-md">
            {product.category}
          </Badge>
          <Badge
            variant="destructive"
            className="absolute top-4 right-12 backdrop-blur-md"
          >
            -{product.discountPercentage}%
          </Badge>
        </div>

        <div className="p-6 space-y-6">
          <SheetHeader>
            <div className="flex justify-between items-start gap-4">
              <div>
                <SheetTitle className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {product.title}
                </SheetTitle>
                <SheetDescription className="text-sm mt-1">
                  {product.brand && (
                    <span className="font-medium text-muted-foreground">
                      {product.brand}
                    </span>
                  )}
                </SheetDescription>
              </div>
              <div className="flex shrink-0 items-center gap-1 bg-secondary/50 px-2.5 py-1 rounded-full text-sm font-medium backdrop-blur-md border border-border/50">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>{product.rating}</span>
              </div>
            </div>
          </SheetHeader>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-extrabold text-foreground">
              ${discountedPrice}
            </span>
            <span className="text-lg text-muted-foreground line-through mb-1.5">
              ${product.price}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors">
              <Package className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Stock</p>
                <p className="text-muted-foreground">
                  {product.availabilityStatus}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Shipping</p>
                <p className="text-muted-foreground">
                  {product.shippingInformation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Warranty</p>
                <p className="text-muted-foreground">Standard 1 Year</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors">
              <RotateCcw className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">Returns</p>
                <p className="text-muted-foreground">{product.returnPolicy}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-8">
            <Button className="flex-1 h-14 rounded-full text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-14 rounded-full text-lg font-semibold border-border/50 bg-card/60 backdrop-blur-md hover:bg-primary/10 hover:text-primary transition-all"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductSheet;
