"use server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { hash, compare } from "bcryptjs";
import { createSession, deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateUserDto, LoginUserDto } from "@/lib/validations/user";
import * as z from "zod";

// register function
// using useActionState we receive the prevState as the first argument, and the form data as the second
export async function register(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = CreateUserDto.safeParse(data);

  // check
  if (!parsedData.success) {
    return {
      error: "Invalid credentials",
      details: z.treeifyError(parsedData.error),
    };
  }
  const { name, email, password } = parsedData.data;

  // check
  const existingUser = await db.query.usersTable.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  // hash password
  const passwordHash = await hash(password, 12);

  // insert user
  const [newUser] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      passwordHash,
    })
    .returning({
      id: usersTable.id,
    });

  // create session
  await createSession(newUser.id);

  // redirect to home
  redirect("/notes");
}

// login function
export async function login(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = LoginUserDto.safeParse(data);

  // check
  if (!parsedData.success) {
    return {
      error: "Invalid credentials",
    };
  }

  const { email, password } = parsedData.data;

  // check find user
  const user = await db.query.usersTable.findFirst({
    where: {
      email: email,
    },
  });

  if (!user || !(await compare(password, user.passwordHash))) {
    return {
      error: "Invalid email or password",
    };
  }

  await createSession(user.id);
  redirect("/notes");
}

// logout
export async function logout() {
  await deleteSession();
  redirect("./login");
}
