import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { deleteNote, togglePinNote } from "@/app/actions/notes";
import { eq, and, desc } from "drizzle-orm";

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();
  if (!session?.userId) return null;

  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams.category as string | undefined;

  const conditions = eq(notesTable.userId, session.userId as string);

  const userNotes = await db
    .select()
    .from(notesTable)
    .where(
      categoryFilter
        ? and(
            conditions,
            eq(
              notesTable.category,
              categoryFilter as "work" | "personal" | "other",
            ),
          )
        : conditions,
    )
    .orderBy(desc(notesTable.isPinned), desc(notesTable.updatedAt));

  return (
    <div className="max-w-xl mx-auto my-8 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">My Notes</h1>
        <Link
          href="/notes/new"
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          + New Note
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 text-sm mb-4">
        <Link
          href="/notes"
          className={!categoryFilter ? "font-bold underline" : ""}
        >
          All
        </Link>
        <Link
          href="/notes?category=work"
          className={categoryFilter === "work" ? "font-bold underline" : ""}
        >
          Work
        </Link>
        <Link
          href="/notes?category=personal"
          className={categoryFilter === "personal" ? "font-bold underline" : ""}
        >
          Personal
        </Link>
        <Link
          href="/notes?category=other"
          className={categoryFilter === "other" ? "font-bold underline" : ""}
        >
          Other
        </Link>
      </div>

      {/* Notes List */}
      {userNotes.length === 0 ? (
        <p className="text-gray-500 text-sm">No notes found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {userNotes.map((note) => (
            <div key={note.id} className="border p-3 rounded">
              <div className="flex justify-between items-start">
                <Link
                  href={`/notes/${note.id}`}
                  className="font-bold hover:underline"
                >
                  {note.title}
                </Link>
                <form action={togglePinNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <input
                    type="hidden"
                    name="isPinned"
                    value={note.isPinned ? "true" : "false"}
                  />
                  <button
                    type="submit"
                    className={
                      note.isPinned ? "text-yellow-500" : "text-gray-400"
                    }
                  >
                    ★
                  </button>
                </form>
              </div>

              {note.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={note.imageUrl}
                  alt={note.title}
                  className="w-full h-32 object-cover my-2 rounded"
                />
              )}

              <p className="text-sm my-2">{note.content}</p>

              <div className="flex justify-between text-xs text-gray-500 border-t pt-2 mt-2">
                <span>{note.category}</span>
                <div className="flex gap-3">
                  <Link
                    href={`/notes/${note.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <form action={deleteNote}>
                    <input type="hidden" name="id" value={note.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
