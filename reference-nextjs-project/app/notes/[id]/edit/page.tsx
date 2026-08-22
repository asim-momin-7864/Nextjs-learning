import { db } from '@/db';
import { notes } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
// Force IDE refresh for the module import
import EditNoteForm from './EditNoteForm';

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  
  // Await params per Next.js 16 conventions
  const { id } = await params;

  // Fetch the existing note
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
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Note</h1>
      
      {/* We pass the fetched data to a Client Component form */}
      <EditNoteForm note={note} />
    </div>
  );
}
