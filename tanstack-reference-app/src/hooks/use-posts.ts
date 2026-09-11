/**
 * @file use-posts.ts
 * @description TanStack Query hook for fetching the list of posts.
 *
 * KEY PATTERNS DEMONSTRATED:
 *
 * 1. `queryOptions()` factory (TanStack Query v5)
 *    `queryOptions` is a new helper that co-locates the query key and query
 *    function into a single reusable object. Benefits:
 *     - Type safety: the key and fn are linked, so the inferred data type
 *       flows through correctly everywhere this options object is used.
 *     - Reusability: pass `postsQueryOptions` to `useQuery`, `prefetchQuery`,
 *       or `queryClient.invalidateQueries` — the key is always consistent.
 *     - No "magic strings": the query key is defined once and referenced by
 *       import, eliminating typos across files.
 *
 * 2. NO manual generics on `useQuery`
 *    We don't write `useQuery<Post[], Error>(postsQueryOptions)`.
 *    TanStack v5 infers `TData` from the `queryFn`'s return type (`Promise<Post[]>`).
 *    The `data` property on the returned object is automatically typed as
 *    `Post[] | undefined` — no manual annotation needed.
 */

import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api";

// ---------------------------------------------------------------------------
// 1. Query Key — the cache's "address" for this data
// ---------------------------------------------------------------------------

/**
 * QUERY KEY BEST PRACTICES:
 * - Always use arrays (even for simple keys) to allow hierarchical invalidation.
 * - Nest from most-general to most-specific: `["posts"]` → `["posts", postId]`.
 * - `queryClient.invalidateQueries({ queryKey: ["posts"] })` will invalidate
 *   BOTH `["posts"]` AND `["posts", 1]` because of prefix-matching.
 */
export const POSTS_QUERY_KEY = ["posts"] as const;

// ---------------------------------------------------------------------------
// 2. `queryOptions` factory — the reusable query definition
// ---------------------------------------------------------------------------

/**
 * `postsQueryOptions` is exported so other parts of the app can reference
 * the same query key for cache invalidation without importing a "magic string".
 *
 * Example usage in useMutation's onSuccess:
 *   `queryClient.invalidateQueries({ queryKey: postsQueryOptions.queryKey })`
 */
export const postsQueryOptions = queryOptions({
  queryKey: POSTS_QUERY_KEY,
  queryFn: fetchPosts,
});

// ---------------------------------------------------------------------------
// 3. The custom hook
// ---------------------------------------------------------------------------

/**
 * `usePosts` wraps TanStack Query's `useQuery` with our pre-configured options.
 *
 * The returned `data` is typed as `Post[] | undefined` automatically.
 * Components using this hook don't need to know about fetching logic —
 * they just consume `{ data, isLoading, isError, error }`.
 */
export function usePosts() {
  return useQuery(postsQueryOptions);
}
