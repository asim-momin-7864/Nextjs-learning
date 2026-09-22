import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import NoteForm from "@/components/custome/NoteForm";

export const instant = false;

const page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading notes: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 max-w-6xl px-4 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Your Notes
        </h1>
        <p className="text-muted-foreground">
          Manage your daily thoughts and tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left column: Create Form */}
        <div className="md:col-span-1 md:sticky md:top-8">
          <NoteForm />
        </div>

        {/* Right column: Note List */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Recent Notes
          </h2>
          {notes?.length === 0 || notes === null ? (
            <div className="p-12 text-center border rounded-xl bg-muted/20 border-dashed">
              <p className="text-muted-foreground">
                You haven't created any notes yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {notes.map((note) => (
                <Link
                  key={note.id}
                  href={`/notes/${note.id}`}
                  className="block group"
                >
                  <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/50 group-hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg leading-tight line-clamp-1">
                        {note.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(note.created_at).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    {note.content && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {note.content}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
