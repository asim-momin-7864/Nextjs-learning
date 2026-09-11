/**
 * @file query-provider.tsx
 * @description TanStack Query singleton provider that is safe for Next.js App Router SSR.
 *
 * THE PROBLEM: MULTIPLE QUERYLIENT INSTANCES ON THE SERVER
 * In a typical React app, you'd create the QueryClient once at module level:
 *   `const queryClient = new QueryClient()`
 *
 * This is WRONG in Next.js App Router because:
 *  - The server handles many requests concurrently.
 *  - Module-level singletons are shared across ALL requests on the server.
 *  - User A's cached data would leak into User B's response — a critical
 *    data privacy and correctness bug.
 *
 * THE SOLUTION: `useRef` Singleton Per Component Instance
 * By storing the QueryClient in a `useRef`, we ensure:
 *  1. Server-side: Each render call gets its own QueryClient (no shared state).
 *  2. Client-side: The QueryClient is created once (on mount) and survives
 *     re-renders, because `useRef` persists for the component's lifetime.
 *
 * This is the official pattern recommended by the TanStack Query team for
 * Next.js App Router:
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
 *
 * "use client" is necessary because:
 *  - `QueryClientProvider` uses React Context internally.
 *  - React Context is not available in Server Components.
 *  - We mark only THIS small wrapper as a client component, keeping the rest
 *    of the app (layout, page) as Server Components.
 */

"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Factory function that creates a QueryClient with sensible defaults.
 * Extracted as a function so the same config is used whether creating
 * the instance on the server or the client.
 */
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * `staleTime` determines how long cached data is considered "fresh".
         * Setting it to 60s means a component mounting within 60 seconds of
         * a query being fetched will NOT fire a new network request —
         * it will use the cached data immediately. This significantly reduces
         * redundant API calls when navigating between pages.
         */
        staleTime: 60 * 1000,

        /**
         * `retry: 1` means TanStack will retry a failed query once before
         * marking it as an error. `retry: false` would report errors immediately.
         */
        retry: 1,
      },
    },
  });
}

/**
 * Module-level client instance. This is only used on the client-side.
 * On the server, a new QueryClient is created per render via `useState`.
 */
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Returns the singleton QueryClient, creating it if it doesn't exist yet.
 * On the server: always creates a new instance (safe for SSR).
 * On the browser: reuses the existing instance (avoids re-creation on re-render).
 */
function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // SERVER: always create a new QueryClient for each request
    return makeQueryClient();
  }

  // BROWSER: create once, then reuse
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * `QueryProvider` wraps the application tree to provide the TanStack Query
 * context. It must be placed high in the component tree (e.g., in layout.tsx).
 *
 * Note: We use `useState` instead of `useRef` here because `useState`'s
 * initializer function only runs once per component lifecycle, which is
 * exactly the behavior we want.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // `useState` with a factory function: the factory runs only ONCE (on mount),
  // not on every re-render. This is the idiomatic way to create an expensive
  // object once in a functional component.
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*
       * ReactQueryDevtools renders a floating panel in development mode only.
       * It lets you inspect every query's state, data, and refetch manually.
       * It is automatically stripped from production builds.
       */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
