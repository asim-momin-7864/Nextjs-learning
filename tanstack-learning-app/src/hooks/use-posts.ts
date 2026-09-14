// tanstack query hook from fetching list of posts

import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";

// Define the query key as a constant array
// The "as const" makes it a readonly tuple, which TanStack Query prefers
export const POSTS_QUERY_KEY = ["posts"] as const;

// Define the query options separately for better readability
// queryKey: the unique key for this query
// queryFn: the function that fetches the data
export const postsQueryOptions = queryOptions({
  queryKey: POSTS_QUERY_KEY,
  queryFn: fetchPosts,
});

// Custom hook to use the posts query
export function usePosts() {
  // Call useQuery with the defined options
  const queryResult = useQuery(postsQueryOptions);
  
  // Return the result
  return queryResult;
}
