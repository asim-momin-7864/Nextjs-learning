"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost } from "@/hooks/use-create-post";
import { CreatePostSchema, type CreatePostInput } from "@/lib/schema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Create Post Form Component
export function CreatePostForm() {
  // Call the useCreatePost hook to get the mutation function and pending state
  const createPostMutation = useCreatePost();
  const createPost = createPostMutation.mutate;
  const isPending = createPostMutation.isPending;

  // Initialize the form with react-hook-form and zod validation
  const formOptions = {
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  };
  const form = useForm<CreatePostInput>(formOptions);

  // Function to handle form submission
  function onSubmit(data: CreatePostInput) {
    // Combine the form data with a default userId
    const postPayload = {
      title: data.title,
      body: data.body,
      userId: 1, // Default user ID
    };

    // Define options for the mutation
    const mutationOptions = {
      onSuccess: function () {
        // Reset the form fields after a successful submission
        form.reset();
      },
    };

    // Call the mutate function to create the post
    createPost(postPayload, mutationOptions);
  }

  // Render the form inside a Card component
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          // Pass the onSubmit function to form.handleSubmit
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Title input field */}
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="What's on your mind?"
              disabled={isPending}
              {...form.register("title")}
            />
            <FieldDescription>Min 3 chars max 100</FieldDescription>
            {/* Display errors for the title field */}
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

          {/* Body textarea field */}
          <Field>
            <FieldLabel htmlFor="body">Body</FieldLabel>
            <textarea
              id="body"
              placeholder="Write something interesting..."
              disabled={isPending}
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...form.register("body")}
            />
            <FieldDescription>Min 10 characters, max 500.</FieldDescription>
            {/* Display errors for the body field */}
            <FieldError errors={[form.formState.errors.body]} />
          </Field>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            id="crate-post-submit"
          >
            {/* Show different text based on the pending state */}
            {isPending ? "Publishing......" : "Publish Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
