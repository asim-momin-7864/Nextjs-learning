"use client";

// query provider
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// factory func to create client
const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        retry: 2, // if fetch fails, retry 2 times
      },
    },
  });
};

// browser client switch
let browserQueryClient: QueryClient | undefined = undefined;

// return query client for server or browser
function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    // make query client if for server
    return makeQueryClient();
  }

  // make once for browser
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

// type for props
interface QueryProviderProps {
  children: React.ReactNode;
}

// query provider wrapper component
export function QueryProvider({ children }: QueryProviderProps) {
  // state
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
