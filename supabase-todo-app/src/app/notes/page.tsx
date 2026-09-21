import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const instant = false;

const page = async () => {
  //* server component
  // fetch notes from supabase
  const supabase = await createClient();

  // auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if not user
  if (!user) {
    redirect("/login");
  }

  // data
  const { data, error } = await supabase.from("notes").select("*");
  const notes = data || [];

  // error
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl px-4">
      <h1 className="text-4xl font-bold mb-8 tracking-tight text-foreground">
        Notes
      </h1>
      {notes.length === 0 ? (
        <p className="text-muted-foreground text-lg">No notes found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Card
              key={note.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl leading-tight">
                  {note.title}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
