'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { hash, compare } from 'bcryptjs';
import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { loginSchema, registerSchema } from '@/lib/validations/auth';

// Using useActionState, we receive the prevState as the first argument, and the form data as the second
export async function register(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: 'Invalid form data',
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;

  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: 'User already exists' };
  }

  // Hash password (bcryptjs is synchronous-friendly enough or we can use await hash)
  const passwordHash = await hash(password, 10);

  // Insert user
  const [newUser] = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash,
    })
    .returning({ id: users.id });

  // Create session
  await createSession(newUser.id);
  redirect('/notes');
}

export async function login(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: 'Invalid credentials' };
  }

  const { email, password } = parsed.data;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || !(await compare(password, user.passwordHash))) {
    return { error: 'Invalid email or password' };
  }

  await createSession(user.id);
  redirect('/notes');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
