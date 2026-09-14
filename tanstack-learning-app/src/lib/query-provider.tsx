"use client";

// query provider
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Factory function to create a new QueryClient
function makeQueryClient() {
  const newClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Time in milliseconds before a query is considered stale
        staleTime: 1000 * 60, // 1 minute
        // Number of times to retry a failed query
        retry: 2, 
      },
    },
  });

  return newClient;
}

// Variable to store the QueryClient for the browser environment
let browserQueryClient: QueryClient | undefined = undefined;

// Function to get the correct QueryClient for server or browser
function getQueryClient(): QueryClient {
  // Check if we are running on the server
  if (typeof window === "undefined") {
    // On the server, always create a new QueryClient
    return makeQueryClient();
  }

  // Check if we are running in the browser and the client is not yet created
  if (browserQueryClient === undefined) {
    // On the browser, create the QueryClient once and store it
    browserQueryClient = makeQueryClient();
  }

  // Return the stored browser QueryClient
  return browserQueryClient;
}

// Interface defining the props for the QueryProvider component
interface QueryProviderProps {
  children: React.ReactNode;
}

// Wrapper component that provides the QueryClient to the rest of the app
export function QueryProvider(props: QueryProviderProps) {
  // Extract children from props
  const children = props.children;

  // Initialize the query client state once using getQueryClient
  const [queryClient] = useState(function() {
    return getQueryClient();
  });

  // Render the QueryClientProvider with the ReactQueryDevtools
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
