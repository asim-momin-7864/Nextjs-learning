// use create post

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/toast";
import { postsQueryOptions } from "./use-posts";
import { createPost } from "@/lib/api";
import type { Post } from "@/lib/schema";

export function useCreatePost() {
  // Get the query client so we can invalidate queries after a successful mutation
  const queryClient = useQueryClient();

  // Define the mutation options
  const mutationOptions = {
    // The function that performs the mutation
    mutationFn: createPost,

    // This function runs when the mutation is successful
    onSuccess: function (data: Post) {
      // Invalidate the posts query so it refetches the new list
      queryClient.invalidateQueries({
        queryKey: postsQueryOptions.queryKey,
      });

      // Show a success toast notification
      toast.add({
        type: "success",
        title: "Post created",
        description: `"${data.title}" was published successfully!`,
      });
    },

    // This function runs when the mutation fails
    onError: function (error: unknown) {
      // Check if the error is from Axios
      if (axios.isAxiosError(error)) {
        let serverMessage = error.message;

        // Try to get a specific error message from the server request data
        const requestObj = error.request as { data?: { message?: string } };
        if (requestObj && requestObj.data && requestObj.data.message) {
          serverMessage = requestObj.data.message;
        }

        // Show an error toast notification with the server message
        toast.add({
          type: "error",
          title: "Failed to create post",
          description: serverMessage,
        });
      } else {
        // Handle unexpected non-axios errors
        toast.add({
          type: "error",
          title: "Failed to create post",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    },
  };

  // Call useMutation with the defined options
  const mutationResult = useMutation(mutationOptions);

  // Return the result
  return mutationResult;
}
