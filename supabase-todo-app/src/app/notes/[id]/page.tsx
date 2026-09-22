import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NoteDetailManager from "@/components/custome/NoteDetailManager";
import Link from "next/link";

export const instant = false;

const NoteDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <div className="container mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-3xl font-bold text-red-500 tracking-tight">
          Note not found
        </h2>
        <p className="text-muted-foreground">
          The note you're looking for doesn't exist or you don't have permission
          to view it.
        </p>
        <Link
          href="/notes"
          className="text-primary hover:underline font-medium inline-block mt-4"
        >
          &larr; Return to notes
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center items-start min-h-[calc(100vh-100px)]">
      <NoteDetailManager note={data} />
    </div>
  );
};

export default NoteDetailPage;
