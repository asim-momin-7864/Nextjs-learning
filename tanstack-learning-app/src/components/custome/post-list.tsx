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

// Skeleton component shown while loading
function PostCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-3 w-full mb-3" />
        <Skeleton className="h-3 w-full mb-3" />
        <Skeleton className="h-3 w-4/5 mb-3" />
      </CardContent>
    </Card>
  );
}

// Main component to display the list of posts
export function PostList() {
  // Call the usePosts hook to fetch posts data
  // We extract the properties into separate variables for better readability
  const postsQuery = usePosts();
  const posts = postsQuery.data;
  const isLoading = postsQuery.isLoading;
  const isError = postsQuery.isError;
  const error = postsQuery.error;

  // Handle the loading state
  if (isLoading) {
    // Create an array of 6 items to map over for skeletons
    const skeletonArray = Array.from({ length: 6 });

    return (
      <section>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Map over the array to render skeleton cards */}
          {skeletonArray.map(function (item, index) {
            return <PostCardSkeleton key={index} />;
          })}
        </div>
      </section>
    );
  }

  // Handle the error state
  if (isError) {
    let errorMessage = "An unknown error occurred";

    // Check if the error object is a standard JavaScript Error
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Check if the error is specifically an Axios error (API error)
    if (axios.isAxiosError(error)) {
      let status = "";
      // Safely check for response and status
      if (error.response && error.response.status) {
        status = String(error.response.status);
      }

      let apiMessage = error.message;
      // Safely check for response data and a message property
      if (error.response && error.response.data) {
        const responseData = error.response.data as { message?: string };
        if (responseData.message) {
          apiMessage = responseData.message;
        }
      }

      // Combine the status and message into a readable format
      errorMessage = `API Error ${status} : \n        ${apiMessage} `;
    }

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

  // Handle the success state (data is loaded successfully)
  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Map over the posts array to render each post inside a Card */}
        {posts && posts.map(function (post) {
          return (
            <Card key={post.id} className="transition-shadow hover:shodow-md">
              <CardHeader>
                <CardTitle className="line-clamp-1 text-sm">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  User #{post.userId} . Post #{post.id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-xs text-muted-foreground">
                  {post.body}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
