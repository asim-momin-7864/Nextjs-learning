/* eslint-disable @next/next/no-img-element */
import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteNote } from "@/app/actions/notes";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  const { id } = await params;

  const [note] = await db
    .select()
    .from(notesTable)
    .where(
      and(
        eq(notesTable.id, id),
        eq(notesTable.userId, session?.userId as string),
      ),
    )
    .limit(1);

  if (!note) notFound();

  return (
    <div className="max-w-2xl mx-auto my-8 p-4">
      <Link href="/notes" className="text-sm text-blue-600 hover:underline">
        &larr; Back to Notes
      </Link>

      <div className="mt-4">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">
            {note.isPinned && <span className="text-yellow-500 mr-1">★</span>}
            {note.title}
          </h1>
          <div className="flex gap-2">
            <Link
              href={`/notes/${note.id}/edit`}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <form action={deleteNote}>
              <input type="hidden" name="id" value={note.id} />
              <button
                type="submit"
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </form>
          </div>
        </div>

        <div className="flex gap-3 mt-2 text-xs text-gray-500">
          <span>{note.category}</span>
          <span>{new Date(note.updatedAt!).toLocaleDateString()}</span>
        </div>

        {note.imageUrl && (
          <img
            src={note.imageUrl}
            alt={note.title}
            className="w-full max-h-72 object-cover rounded mt-4"
          />
        )}

        <p className="mt-4 text-sm whitespace-pre-wrap text-gray-800">
          {note.content}
        </p>
      </div>
    </div>
  );
}
