// use create post

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/toast";
import { CreatePost } from "@/lib/schema";
import { postsQueryOptions } from "./use-posts";
import { CreatePostSchema } from "@/lib/schema";
import { createPost } from "@/lib/api";
import { ToastDescription } from "@base-ui/react";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: postsQueryOptions.queryKey,
      });

      toast.add({
        type: "success",
        title: "Post created",
        description: `"${data.title}" was published successfully!`,
      });
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverMessage =
          (error.request?.data as { message?: string })?.message ??
          error.message;

        toast.add({
          type: "error",
          title: "Failed to create post",
          description: serverMessage,
        });
      } else {
        // unexpected non-axios error
        toast.add({
          type: "error",
          title: "Failed to create post",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    },
  });
}
