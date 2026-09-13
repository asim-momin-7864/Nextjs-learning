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

//
export function CreatePostForm() {
  const { mutate: createPost, isPending } = useCreatePost();

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  // handle form sumbit
  function onSubmit(data: CreatePostInput) {
    createPost(
      { ...data, userId: 1 },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  }

  //
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* title field */}
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="What's on your mind?"
              disabled={isPending}
              {...form.register("title")}
            />
            <FieldDescription>Min 3 chars max 100</FieldDescription>
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

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
            <FieldError errors={[form.formState.errors.body]} />
          </Field>

          {/* button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            id="crate-post-submit"
          >
            {isPending ? "Publishing......" : "Publish Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
