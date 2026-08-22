/* eslint-disable @next/next/no-img-element */
import { db } from '@/db';
import { notes } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { deleteNote } from '@/app/actions/notes';

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  
  // Next.js 16 requires awaiting params
  const { id } = await params;

  // Fetch the note directly on the server
  const note = await db.query.notes.findFirst({
    where: and(
      eq(notes.id, id),
      eq(notes.userId, session?.userId as string)
    ),
  });

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/notes" className="text-blue-600 hover:underline">← Back to Notes</Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            {note.isPinned && <span className="text-yellow-500 mr-2">★</span>}
            {note.title}
          </h1>
          <div className="flex space-x-2">
            <Link 
              href={`/notes/${note.id}/edit`}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
            >
              Edit
            </Link>
            <form action={deleteNote}>
              <input type="hidden" name="id" value={note.id} />
              <button 
                type="submit"
                className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
              >
                Delete
              </button>
            </form>
          </div>
        </div>

        <div className="flex space-x-4 mb-8 text-sm text-gray-500 border-b pb-4">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{note.category}</span>
          <span className={`px-2 py-1 rounded capitalize ${
            note.priority === 'high' ? 'bg-red-50 text-red-700' :
            note.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
          }`}>
            {note.priority} Priority
          </span>
          <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
        </div>

        {note.imageUrl && (
          <div className="mb-8">
            <img 
              src={note.imageUrl} 
              alt={note.title} 
              className="max-h-96 rounded-lg object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
          {note.content}
        </div>
      </div>
    </div>
  );
}
