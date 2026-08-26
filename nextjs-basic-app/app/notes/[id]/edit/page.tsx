import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import EditNoteForm from "./EditNoteForm";

export default async function EditNotePage({
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
      <h1 className="text-xl font-bold mb-6">Edit Note</h1>
      <EditNoteForm note={note} />
    </div>
  );
}
