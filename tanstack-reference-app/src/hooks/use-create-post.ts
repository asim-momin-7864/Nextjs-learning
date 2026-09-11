/**
 * @file use-create-post.ts
 * @description TanStack Query mutation hook for creating a new post.
 *
 * KEY PATTERNS DEMONSTRATED:
 *
 * 1. `useMutation` — for non-idempotent server operations (POST, PUT, DELETE).
 *    Unlike `useQuery` (which runs automatically), mutations are triggered
 *    imperatively via `mutate()` or `mutateAsync()`.
 *
 * 2. `onSuccess` + `invalidateQueries` — cache invalidation.
 *    After a successful mutation, the posts list is stale on the server.
 *    Calling `invalidateQueries` marks the `["posts"]` cache entry as stale,
 *    which causes TanStack Query to refetch it automatically on the next render
 *    where a component subscribes to that query.
 *
 * 3. NO manual generics on `useMutation`.
 *    TanStack v5 infers `TData` from `mutationFn`'s return type (`Promise<Post>`)
 *    and `TVariables` from the argument type (`Omit<Post, "id">`).
 *
 * 4. Error handling with `axios.isAxiosError`.
 *    The `onError` callback receives the error. We use `axios.isAxiosError()`
 *    to type-narrow it to an `AxiosError`, which has a structured `.response`
 *    containing the backend's error message — much more useful than a
 *    generic `Error` object.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { createPost } from "@/lib/api";
import { postsQueryOptions } from "@/hooks/use-posts";
import type { CreatePostInput } from "@/lib/schemas";

export function useCreatePost() {
  /**
   * `useQueryClient` gives access to the QueryClient instance to imperatively
   * interact with the cache (invalidate, prefetch, set data, etc.).
   */
  const queryClient = useQueryClient();

  return useMutation({
    /**
     * `mutationFn` is the async function that performs the side effect.
     * It receives the variables passed to `mutate(variables)`.
     *
     * WHY `Omit<Post, "id">` and not `CreatePostInput`?
     * `CreatePostInput` only has `title` and `body` (what the form captures).
     * The API also needs `userId`. We augment the payload in the component
     * before calling `mutate()`, so the final type sent to the API includes
     * `userId`. Using `Omit<Post, "id">` here keeps the API contract strict.
     */
    /**
     * The mutationFn receives exactly what `createPost` expects: a Post without
     * an `id`. TypeScript enforces the shape; no generics needed on `useMutation`
     * itself — v5 infers TData and TVariables from this function signature.
     */
    mutationFn: createPost,

    onSuccess: (data) => {
      /**
       * CACHE INVALIDATION STRATEGY:
       * `invalidateQueries` tells TanStack Query that data matching the given
       * key is stale. On the next render where `usePosts` is active, a fresh
       * network request will fire automatically.
       *
       * WHY NOT just update the cache directly with `setQueryData`?
       * `setQueryData` is faster (no network round-trip) but risks showing
       * optimistic/fake data if the server transforms or enriches the response.
       * `invalidateQueries` ensures the client always shows the server's truth.
       * For this demo, we use invalidation for correctness.
       */
      queryClient.invalidateQueries({ queryKey: postsQueryOptions.queryKey });

      toast.success("Post created!", {
        description: `"${data.title}" was published successfully.`,
      });
    },

    onError: (error) => {
      /**
       * `axios.isAxiosError(error)` is a type guard provided by Axios.
       * It narrows `unknown` → `AxiosError`, unlocking access to:
       *   - `error.response?.data` — the parsed response body from the server
       *   - `error.response?.status` — the HTTP status code
       *   - `error.message` — the Axios-generated message (e.g., "Network Error")
       *
       * This is the CORRECT way to handle Axios errors in TypeScript.
       * Never cast `error as AxiosError` directly — that bypasses type safety.
       */
      if (axios.isAxiosError(error)) {
        const serverMessage =
          (error.response?.data as { message?: string })?.message ??
          error.message;
        toast.error("Failed to create post", {
          description: serverMessage,
        });
      } else {
        // Unexpected non-Axios error (e.g., a bug in the mutationFn itself)
        toast.error("An unexpected error occurred.");
      }
    },
  });
}
