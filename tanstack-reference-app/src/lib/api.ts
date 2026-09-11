/**
 * @file api.ts
 * @description Axios instance, request interceptor, and typed fetcher functions.
 *
 * WHY A CUSTOM AXIOS INSTANCE?
 * Instead of calling `axios.get(...)` directly, we create a configured instance
 * with `axios.create()`. This gives us:
 *  1. A `baseURL` — all paths are relative, reducing repetition.
 *  2. Default headers — `Content-Type: application/json` is always set.
 *  3. A single place to attach interceptors for auth, logging, and error handling.
 *
 * INTERCEPTOR ARCHITECTURE:
 * The request interceptor runs before every outgoing request.
 * It reads the token from the Zustand store via `useAuthStore.getState()`.
 * Using `.getState()` (the static Zustand getter) is critical here because:
 *  - Interceptors run outside the React component tree.
 *  - We cannot call hooks (like `useAuthStore()`) outside components.
 *  - `getState()` is synchronous and always returns the current store snapshot.
 */

import axios from "axios";
import type { Post } from "@/lib/schemas";
import { useAuthStore } from "@/store/use-auth-store";

// ---------------------------------------------------------------------------
// 1. Create the Axios instance
// ---------------------------------------------------------------------------

export const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------------------------------------------------------------------
// 2. Request Interceptor — attach the auth token from Zustand
// ---------------------------------------------------------------------------

apiClient.interceptors.request.use(
  (config) => {
    /**
     * `.getState()` is Zustand's escape hatch for reading state outside React.
     * This is intentional and idiomatic. The token is always fresh because
     * Zustand's store is a module-level singleton — the same instance that
     * React components subscribe to.
     */
    const token = useAuthStore.getState().token;

    if (token) {
      // Standard Bearer token pattern per RFC 6750.
      // JSONPlaceholder will ignore this, but a real API would validate it.
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // If the request setup itself fails (e.g., invalid config), reject the promise.
    return Promise.reject(error);
  }
);

// ---------------------------------------------------------------------------
// 3. Typed Fetcher Functions
// ---------------------------------------------------------------------------

/**
 * WHY SEPARATE FETCHER FUNCTIONS (not inline in useQuery)?
 * - They're individually testable units.
 * - They return typed promises, which is what TanStack Query infers from.
 * - We don't need to pass generics to `useQuery` — TanStack v5 infers the
 *   type from the `queryFn`'s return type automatically.
 *
 * HOW TYPING WORKS:
 * `apiClient.get<Post[]>('/posts')` tells Axios that `response.data` is `Post[]`.
 * We return `response.data`, so the function signature becomes `() => Promise<Post[]>`.
 * TanStack Query sees this return type and uses `Post[]` for `data` automatically.
 */

/** Fetches all posts. Returns a typed `Post[]` array. */
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>("/posts", {
    // Limit results for a cleaner demo UI
    params: { _limit: 8 },
  });
  return response.data;
};

/** Creates a new post. The server echoes the post back with a generated `id`. */
export const createPost = async (
  payload: Omit<Post, "id">
): Promise<Post> => {
  const response = await apiClient.post<Post>("/posts", payload);
  return response.data;
};
