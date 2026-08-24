import { z } from "zod";
import { createInsertSchema } from "drizzle-orm/zod";
import { usersTable } from "@/db/schema";

// register
export const CreateUserDto = createInsertSchema(usersTable, {
  name: (s) => s.min(1, "Name is required").nonempty("Name is required"),
  email: () => z.email("Invalid email").nonempty("Email is required"),
})
  .omit({
    id: true,
    passwordHash: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    password: z
      .string()
      .min(1, "Password is required")
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

// login
export const LoginUserDto = CreateUserDto.pick({
  email: true,
  password: true,
});
