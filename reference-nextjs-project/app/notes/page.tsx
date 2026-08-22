import { db } from '@/db';
import { notes } from '@/db/schema';
import { eq, and, desc, SQL } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { deleteNote, togglePinNote } from '@/app/actions/notes';

// Server Component querying Drizzle directly to list all notes.
export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();
  if (!session?.userId) {
    return null; // Handled by middleware redirect, but added for safety
  }

  // Next.js 16 requires awaiting searchParams
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams.category as string | undefined;

  // Build the query conditions
  let conditions: SQL | undefined = eq(notes.userId, session.userId as string);
  if (categoryFilter) {
    conditions = and(conditions, eq(notes.category, categoryFilter));
  }

  // Fetch data directly on the server
  const userNotes = await db.query.notes.findMany({
    where: conditions,
    orderBy: [desc(notes.isPinned), desc(notes.updatedAt)],
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
        <Link
          href="/notes/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + New Note
        </Link>
      </div>

      <div className="mb-6 flex space-x-2">
        <Link href="/notes" className={`px-4 py-1 rounded-full text-sm ${!categoryFilter ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>All</Link>
        <Link href="/notes?category=Work" className={`px-4 py-1 rounded-full text-sm ${categoryFilter === 'Work' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>Work</Link>
        <Link href="/notes?category=Personal" className={`px-4 py-1 rounded-full text-sm ${categoryFilter === 'Personal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>Personal</Link>
        <Link href="/notes?category=Ideas" className={`px-4 py-1 rounded-full text-sm ${categoryFilter === 'Ideas' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>Ideas</Link>
      </div>

      {userNotes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">No notes found.</p>
          <Link href="/notes/new" className="text-blue-600 hover:underline">Create your first note</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userNotes.map((note) => (
            <div key={note.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm flex flex-col hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <Link href={`/notes/${note.id}`} className="font-semibold text-lg text-gray-900 hover:text-blue-600">
                  {note.title}
                </Link>
                <form action={togglePinNote}>
                  <input type="hidden" name="id" value={note.id} />
                  <input type="hidden" name="isPinned" value={note.isPinned ? 'true' : 'false'} />
                  <button type="submit" className={`text-xl ${note.isPinned ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                  </button>
                </form>
              </div>
              
              {note.imageUrl && (
                <div className="mb-4">
                  <img src={note.imageUrl} alt={note.title} className="w-full h-40 object-cover rounded-md" />
                </div>
              )}
              
              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{note.content}</p>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="bg-gray-100 px-2 py-1 rounded">{note.category}</span>
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex justify-end space-x-2 border-t pt-3">
                  <Link href={`/notes/${note.id}/edit`} className="text-sm text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <form action={deleteNote}>
                    <input type="hidden" name="id" value={note.id} />
                    <button type="submit" className="text-sm text-red-600 hover:underline">
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
