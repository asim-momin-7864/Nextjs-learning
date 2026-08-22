'use server';

import { db } from '@/db';
import { notes } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { noteSchema } from '@/lib/validations/notes';

export async function createNote(prevState: unknown, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized'); // Uncaught exception handled by error boundary
  }

  const rawData = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
    priority: formData.get('priority') as string,
    imageUrl: formData.get('imageUrl') as string,
  };

  const parsed = noteSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: 'Invalid form data',
      details: parsed.error.flatten().fieldErrors,
    };
  }

  await db.insert(notes).values({
    userId: session.userId as string,
    ...parsed.data,
  });

  revalidatePath('/notes');
  redirect('/notes');
}

export async function updateNote(id: string, prevState: unknown, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const rawData = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
    priority: formData.get('priority') as string,
    imageUrl: formData.get('imageUrl') as string,
  };

  const parsed = noteSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: 'Invalid form data',
      details: parsed.error.flatten().fieldErrors,
    };
  }

  // Ensure user owns the note before updating
  await db
    .update(notes)
    .set({
      ...parsed.data,
      updatedAt: new Date(),
    })
    .where(and(eq(notes.id, id), eq(notes.userId, session.userId as string)));

  revalidatePath('/notes');
  revalidatePath(`/notes/${id}`);
  redirect('/notes');
}

export async function deleteNote(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const id = formData.get('id') as string;
  if (!id) throw new Error('Note ID is required');

  await db
    .delete(notes)
    .where(and(eq(notes.id, id), eq(notes.userId, session.userId as string)));

  revalidatePath('/notes');
}

export async function togglePinNote(formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    throw new Error('Unauthorized');
  }

  const id = formData.get('id') as string;
  const isPinned = formData.get('isPinned') === 'true';

  await db
    .update(notes)
    .set({ isPinned: !isPinned }) // toggle
    .where(and(eq(notes.id, id), eq(notes.userId, session.userId as string)));

  revalidatePath('/notes');
}
