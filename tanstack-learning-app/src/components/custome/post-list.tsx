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

// skeleteton
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

// main component
export function PostList() {
  const { data: posts, isLoading, isError, error } = usePosts();

  // loading
  if (isLoading) {
    return (
      <section>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // error
  if (isError) {
    let errorMessage = (error as Error).message;

    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? "";
      const data = error.response?.data as { message?: string };
      const apiMessage = data?.message ?? error.message;

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

  // success state
  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts?.map((post) => (
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
        ))}
      </div>
    </section>
  );
}
