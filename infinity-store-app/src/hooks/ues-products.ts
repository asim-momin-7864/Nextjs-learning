// use products hook tanstack

import {
  queryOptions,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { getProducts, getProductById } from "@/lib/api/product-api";
import type { GetProductParamsType } from "@/lib/api/product-api";

// query key factory at once place

const BASE_KEY = "products";

export const productKeys = {
  // writting different keys for different query fetches operations

  // base key for all
  all: [BASE_KEY] as const,

  // so it refeches of use change any parameter...search / pages / catgeory
  list: function (filters: GetProductParamsType) {
    const queryKeyArray = [BASE_KEY, "list", filters] as const;
    return queryKeyArray;
  },

  // key for single product details page
  details: function (id: number | string) {
    const queryKeyArray = [BASE_KEY, "details", id] as const;
    return queryKeyArray;
  },
};

// query options

// first query option for all products fetch
export const productsQueryOptions = (filters: GetProductParamsType) => {
  return queryOptions({
    queryKey: productKeys.list(filters),
    queryFn: () => getProducts(filters),
  });
};

// second query option for single product fetch
export const productDetailsQueryOptions = (id: number | string) => {
  return queryOptions({
    queryKey: productKeys.details(id),
    queryFn: () => getProductById(id),
  });
};

// Hooks (managers)

// use query hook for all products
export const useProducts = (filters: GetProductParamsType) => {
  //
  const optionsBlueprint = productsQueryOptions(filters);

  return useQuery({
    queryKey: optionsBlueprint.queryKey,
    queryFn: optionsBlueprint.queryFn,
    // old page data to avoid layout shift
    placeholderData: keepPreviousData,
  });
};

// ue query hook for single products
export const useProductDetails = (id: number | string) => {
  // blurprint ( query options )
  const optionsBlueprint = productDetailsQueryOptions(id);

  const hasValidId = id !== undefined && id !== null && id !== "";

  return useQuery({
    queryKey: optionsBlueprint.queryKey,
    queryFn: optionsBlueprint.queryFn,

    // check
    enabled: hasValidId,
  });
};
