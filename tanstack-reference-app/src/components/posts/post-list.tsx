/**
 * @file post-list.tsx
 * @description Renders the list of posts with loading skeletons and error handling.
 *
 * "use client" is required because this component:
 *  1. Calls `usePosts()` — a hook that uses TanStack Query's context.
 *  2. React Context is only available in Client Components.
 *
 * RENDERING STATES:
 * TanStack Query always gives us three states to handle:
 *  - `isLoading` (isPending + no data): First load, show skeletons.
 *  - `isError`: The query failed after retries, show error UI.
 *  - `data`: Success — render the posts.
 *
 * WHY SHADCN SKELETONS?
 * Skeletons provide a layout-aware loading state — they match the shape of
 * the content that will appear, which reduces perceived loading time (CLS).
 *
 * ERROR HANDLING:
 * We use `axios.isAxiosError()` to inspect whether the error came from the
 * network layer (Axios) or from some other bug. This gives us access to
 * `error.response.status` and the backend error message.
 */

"use client";

import axios from "axios";
import { usePosts } from "@/hooks/use-posts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// ---------------------------------------------------------------------------
// Skeleton Placeholder — shown while data is loading
// ---------------------------------------------------------------------------

function PostCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        {/* Animate a fake title bar */}
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Animate three fake body lines */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function PostList() {
  /**
   * `usePosts()` returns the full TanStack Query result object.
   * We destructure only what we need. `data` is typed as `Post[] | undefined`
   * — automatically inferred from the `fetchPosts` return type. No casting needed.
   */
  const { data: posts, isLoading, isError, error } = usePosts();

  // --- Loading State ---
  if (isLoading) {
    return (
      <section aria-label="Loading posts" aria-busy="true">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Render 6 skeleton cards to match the expected layout */}
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // --- Error State ---
  if (isError) {
    /**
     * `axios.isAxiosError(error)` type-narrows `Error` → `AxiosError`.
     * Without this guard, TypeScript would only know `error` is of type `Error`,
     * and we couldn't access `.response` safely.
     */
    const errorMessage = axios.isAxiosError(error)
      ? `API Error ${error.response?.status ?? ""}: ${
          (error.response?.data as { message?: string })?.message ??
          error.message
        }`
      : (error as Error).message;

    return (
      <div
        role="alert"
        className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
      >
        <p className="font-semibold">Failed to load posts</p>
        <p className="mt-1 text-xs opacity-80">{errorMessage}</p>
      </div>
    );
  }

  // --- Success State ---
  return (
    <section aria-label="Posts list">
      <div className="grid gap-4 sm:grid-cols-2">
        {posts?.map((post) => (
          <Card key={post.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="line-clamp-1 text-sm">{post.title}</CardTitle>
              <CardDescription className="text-xs">
                User #{post.userId} · Post #{post.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-xs text-muted-foreground">
                {post.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
