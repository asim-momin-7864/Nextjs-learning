// tanstack query hook from fetching list of posts

import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";

//
export const POSTS_QUERY_KEY = ["posts"] as const;

export const postsQueryOptions = queryOptions({
  queryKey: POSTS_QUERY_KEY,
  queryFn: fetchPosts,
});

// custom hook
export function usePosts() {
  return useQuery(postsQueryOptions);
}
