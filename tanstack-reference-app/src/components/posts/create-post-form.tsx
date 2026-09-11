/**
 * @file create-post-form.tsx
 * @description "Create Post" form wiring together RHF + Zod + TanStack Mutation.
 *
 * "use client" is required because this component:
 *  1. Uses `useForm` — a stateful React hook.
 *  2. Calls `useCreatePost` — which uses TanStack Query context.
 *  3. Handles form submission events.
 *
 * WIRING OVERVIEW:
 *
 *   Zod Schema (CreatePostSchema)
 *     └── zodResolver() ──► useForm() ──► <Form> (FormProvider)
 *                                              └── <FormField> (Controller)
 *                                                    └── render prop: { field }
 *                                                          └── <Input {...field} />
 *                                                                └── onSubmit
 *                                                                      └── mutate()
 *                                                                            └── Axios POST
 *
 * WHY `useForm<CreatePostInput>`?
 * `CreatePostInput` is inferred from the Zod schema via `z.infer`. By passing
 * it as the generic to `useForm`, TypeScript knows the exact shape of form
 * values — field names are autocompleted, and `handleSubmit` receives a fully
 * typed `data` object with no casting required.
 *
 * WHY `zodResolver`?
 * RHF's `resolver` option plugs in any validation library. The Zod resolver
 * runs `CreatePostSchema.parse(data)` before `handleSubmit` fires. If
 * validation fails, RHF populates its error state — and `<FormMessage>` renders
 * the Zod error message automatically. No manual error handling in `onSubmit`.
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePost } from "@/hooks/use-create-post";
import { CreatePostSchema, type CreatePostInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function CreatePostForm() {
  const { mutate: createPost, isPending } = useCreatePost();

  /**
   * `useForm` is initialized with:
   *  - `resolver: zodResolver(CreatePostSchema)` — Zod validates on submit.
   *  - `defaultValues` — RHF requires default values to be defined for all
   *    controlled fields (prevents the "uncontrolled → controlled" React warning).
   */
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  /**
   * `handleSubmit` wraps our handler with two guarantees:
   *  1. It calls `zodResolver` first — if validation fails, it populates
   *     `form.formState.errors` and does NOT call `onSubmit`. This means our
   *     `onSubmit` handler ONLY receives valid, type-safe data.
   *  2. It prevents the native browser form submission (no page reload).
   */
  function onSubmit(data: CreatePostInput) {
    /**
     * We augment the validated form data with `userId: 1` (hardcoded for this
     * demo, but in a real app you'd read this from your auth store).
     * The mutation's `onSuccess` and `onError` handlers (in use-create-post.ts)
     * display Sonner toasts and invalidate the posts cache.
     */
    createPost(
      { ...data, userId: 1 },
      {
        /**
         * `onSuccess` callback here (vs. in the hook) is for UI-specific
         * side effects — resetting the form is a view concern, not a data concern.
         * The hook's `onSuccess` handles cache invalidation (data concern).
         */
        onSuccess: () => {
          form.reset();
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
        <CardDescription>
          RHF + Zod validation + TanStack Mutation. On success, the post list
          refetches automatically via cache invalidation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/*
         * <Form> is Shadcn's re-export of RHF's FormProvider.
         * Spreading `form` onto it passes all RHF methods to the React context,
         * making them accessible to every <FormField> inside.
         */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* ---- Title Field ---- */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  {/*
                   * `field` from RHF's Controller render prop contains:
                   * { name, value, onChange, onBlur, ref }
                   * Spreading it onto <Input> registers the field with RHF.
                   * The `id` is set to `field.name` to link with <FormLabel>.
                   */}
                  <Input
                    id={`field-${field.name}`}
                    placeholder="What's on your mind?"
                    disabled={isPending}
                    aria-describedby={`${field.name}-description`}
                    aria-invalid={!!form.formState.errors.title}
                    {...field}
                  />
                  <FormDescription id={`${field.name}-description`}>
                    Min 3 characters, max 100.
                  </FormDescription>
                  {/*
                   * FormMessage automatically reads from form.formState.errors.title
                   * and renders the Zod error message. No manual wiring needed.
                   */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ---- Body Field ---- */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <textarea
                    id={`field-${field.name}`}
                    placeholder="Write something interesting..."
                    disabled={isPending}
                    rows={4}
                    aria-describedby={`${field.name}-description`}
                    aria-invalid={!!form.formState.errors.body}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                  <FormDescription id={`${field.name}-description`}>
                    Min 10 characters, max 500.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*
             * `isPending` is TanStack's flag for an in-flight mutation.
             * We disable the button and show a loading label to prevent
             * duplicate submissions.
             */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
              id="create-post-submit"
            >
              {isPending ? "Publishing…" : "Publish Post"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
