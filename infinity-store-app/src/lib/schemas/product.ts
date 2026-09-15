// product schema

import z from "zod";

// schema reviews
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string(),
  reviewerName: z.string(),
  date: z.date(),
});

// enum
export const categoryEnum = z.enum([
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
]);

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  brand: z.string(),
  category: categoryEnum,
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  availabilityStatus: z.string(),
  description: z.string(),
  thumbnail: z.url(),
  images: z.array(z.url()),
  shippingInformation: z.string(),
  returnPolicy: z.string(),
  reviews: z.array(reviewSchema),
});

// single product type
export type ProductType = z.infer<typeof ProductSchema>;

// prdouct response

export const productResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

// product response type
export type ProductResponseType = z.infer<typeof productResponseSchema>;
