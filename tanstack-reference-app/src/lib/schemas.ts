/**
 * @file schemas.ts
 * @description Central location for ALL Zod schemas and their inferred TypeScript types.
 *
 * WHY ZOD?
 * Zod is a TypeScript-first schema declaration and validation library. By defining
 * our data shapes here once, we get:
 *  1. Runtime validation (we can verify API responses match what we expect).
 *  2. Compile-time types via `z.infer<typeof Schema>` — zero manual type duplication.
 *  3. Form validation via the @hookform/resolvers/zod adapter.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Post Schema — mirrors the JSONPlaceholder /posts resource
// ---------------------------------------------------------------------------

export const PostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

/**
 * Inferred TypeScript type from the Zod schema.
 * We NEVER write `type Post = { id: number; ... }` by hand — this is the
 * single source of truth. TanStack Query hooks will use this type implicitly
 * because our Axios fetcher functions are typed to return `Post` / `Post[]`.
 */
export type Post = z.infer<typeof PostSchema>;

// ---------------------------------------------------------------------------
// Create Post Form Schema — used by React Hook Form + Zod resolver
// ---------------------------------------------------------------------------

/**
 * The form only collects what a user can actually type.
 * `userId` is hardcoded in the mutation; `id` is assigned by the server.
 * Zod validates on the client BEFORE the network request fires.
 */
export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  body: z
    .string()
    .min(10, { message: "Body must be at least 10 characters." })
    .max(500, { message: "Body cannot exceed 500 characters." }),
});

/** Inferred TypeScript type — used as the generic for `useForm<CreatePostInput>`. */
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
