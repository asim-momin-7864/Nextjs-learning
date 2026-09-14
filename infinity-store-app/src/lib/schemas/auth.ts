// auth schema

import z from "zod";

// user login input
export const UserInputSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type UserInputType = z.infer<typeof UserInputSchema>;

// enums
export const genderEnum = z.enum(["male", "female"]);

// user  profile schema
export const UserProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: genderEnum,
  image: z.url(),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;

// login exponse
export const LoginResponseSchema = UserProfileSchema.extend({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
