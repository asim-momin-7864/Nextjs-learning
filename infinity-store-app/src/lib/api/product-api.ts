// product apis
import axios from "axios";
import { ProductSchema, productResponseSchema } from "../schemas/product";
import type { ProductType, ProductResponseType } from "../schemas/product";
import { api } from "./user-api";

//
export interface GetProductParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
}

//
export const getProducts = async (
  params: GetProductParams,
): Promise<ProductResponseType> => {
  // extract values
  const limit = params.limit || 10;
  const skip = params.skip || 0;
  const search = params.search;
  const category = params.category;

  // url
  let url = "/products";

  // url change accoriding to operation

  if (category) {
    url = `/products/category/${category}`;
  } else if (search) {
    url = `/products/search`;
  }

  // axios request
  const response = await api.get(url, {
    params: {
      limit: limit,
      skip: skip,
      q: search ? search : undefined,
    },
  });

  // response
  return productResponseSchema.parse(response.data);
};

// fetcher api for single product
export const getProductById = async (
  id: number | string,
): Promise<ProductType> => {
  const response = await api.get(`/products/${id}`);
  return ProductSchema.parse(response.data);
};
