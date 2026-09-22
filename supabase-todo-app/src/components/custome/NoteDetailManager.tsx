"use client";
import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { updateNote, deleteNote, type ActionState } from "@/actions/notes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { ArrowLeft } from "lucide-react";

// type for the prop we are getting (note data)
export interface Note {
  id: number;
  title: string;
  content: string | null;
  created_at: string;
}

const NoteDetailManager = ({ note }: { note: Note }) => {
  const [isEditing, setIsEditing] = useState(false); // to conditional render note or form
  const [state, formAction, isPending] = useActionState(updateNote, {
    success: false,
  } as ActionState);

  // We use useEffect to monitor the 'state' returned by our Server Action.
  // Because useActionState handles the form submission internally, we don't have a
  // standard handleSubmit function to run code *after* the request finishes.
  // Instead, React updates 'state' when the server responds. We listen for that change,
  // and if it was successful, we flip isEditing back to false to show the updated note!
  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Link
        href="/notes"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all notes
      </Link>

      {!isEditing ? (
        <Card className="w-full shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {note.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Created on {new Date(note.created_at).toDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {note.content ? (
                <p className="whitespace-pre-wrap leading-relaxed">
                  {note.content}
                </p>
              ) : (
                <span className="text-muted-foreground italic">
                  No content provided
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Note
            </Button>
            <form action={deleteNote}>
              <input type="hidden" name="id" value={note.id} />
              <Button type="submit" variant="destructive">
                Delete Note
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <form action={formAction}>
          <Card className="w-full shadow-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Edit Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Global Message Banner */}
              {state?.message && (
                <div
                  className={`p-3 mb-6 rounded-md text-sm font-medium ${state.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {state.message}
                </div>
              )}

              <input type="hidden" name="id" value={note.id} />

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <FieldContent>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      defaultValue={note.title}
                      disabled={isPending}
                    />
                    {state?.errors?.title && (
                      <FieldError>{state.errors.title[0]}</FieldError>
                    )}
                  </FieldContent>
                </Field>

                <Field>
                  <FieldLabel htmlFor="content">Content</FieldLabel>
                  <FieldContent>
                    <textarea
                      name="content"
                      id="content"
                      rows={5}
                      defaultValue={note.content ?? ""}
                      disabled={isPending}
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none md:text-sm"
                    />
                    {state?.errors?.content && (
                      <FieldError>{state.errors.content[0]}</FieldError>
                    )}
                  </FieldContent>
                </Field>
              </FieldGroup>
            </CardContent>

            <CardFooter className="flex gap-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </form>
      )}
    </div>
  );
};

export default NoteDetailManager;
