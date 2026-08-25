"use server";

import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { and } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateNoteDto, UpdateNoteDto } from "@/lib/validations/notes";
import * as z from "zod";
import { eq } from "drizzle-orm";

export async function createNote(prevState: unknown, formData: FormData) {
  const session = await getSession();

  if (!session?.userId) {
    throw new Error("Unauthorized");
  }

  const data = Object.fromEntries(formData);
  const parsedData = CreateNoteDto.safeParse(data);

  // check
  if (!parsedData.success) {
    return {
      error: "Invalid data",
      details: z.treeifyError(parsedData.error),
    };
  }

  await db.insert(notesTable).values({
    userId: session.userId as string,
    ...parsedData.data,
  });

  revalidatePath("/notes");
  redirect("/notes");
}

// update note
export async function updateNote(
  id: string,
  prevState: unknown,
  formDate: FormData,
) {
  const session = await getSession();

  if (!session?.userId) {
    throw new Error("Unauthorized");
  }

  const data = Object.fromEntries(formDate);
  const parsedData = UpdateNoteDto.safeParse(data);

  // check correct parsed or not
  if (!parsedData.success) {
    return {
      error: "Invalid data",
      details: z.treeifyError(parsedData.error),
    };
  }

  // check
  await db
    .update(notesTable)
    .set({
      ...parsedData.data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(notesTable.id, id),
        eq(notesTable.userId, session.userId as string),
      ),
    );

  /*

* What revalidatePath does
In Next.js (App Router), pages and data are often cached on the server to make your app fast. When you update a note in the database, the server's cache still has the old version of that note.

revalidatePath tells Next.js: "Hey, the data on this specific page has changed. Throw away the old cached version, and fetch fresh data from the database the next time this page is loaded."

revalidatePath("/notes") clears the cache for the main notes list.
revalidatePath(\/notes/${id}`)` clears the cache for that specific note's detail page.

*/

  revalidatePath("/notes");
  revalidatePath(`notes/${id}`);
  redirect("/notes");
}

// delete
export async function deleteNote(formData: FormData) {
  const session = await getSession();

  if (!session?.userId) {
    throw new Error("Unauthorized");
  }

  const id = formData.get("id") as string;

  if (!id) throw new Error("Note ID is required");

  await db
    .delete(notesTable)
    .where(
      and(
        eq(notesTable.id, id),
        eq(notesTable.userId, session!.userId as string),
      ),
    );

  revalidatePath("/notes");
}

// toggle pin notes
export async function togglePinNote(formData: FormData) {
  const session = await getSession();

  // check
  if (!session?.userId) {
    throw new Error("Unauthorized");
  }

  // get values
  const id = formData.get("id") as string;
  const isPinnedString = formData.get("isPinned"); // return string not boolean

  // check
  const currentlyPinned = isPinnedString === "true";

  await db
    .update(notesTable)
    .set({
      isPinned: !currentlyPinned,
    })
    .where(
      and(
        eq(notesTable.id, id),
        eq(notesTable.userId, session.userId as string),
      ),
    );

  revalidatePath("/notes");
}
