// zod schema

import { title } from "process";
import z, { number } from "zod";

// post schema

export const PostSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

// create post schema

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters long"),
  body: z
    .string()
    .min(1, "Body is required")
    .min(10, "Body must be at least 10 characters long"),
});

export type CreatePost = z.infer<typeof CreatePostSchema>;
