"use client";

import { addNote, type ActionState } from "@/actions/notes";
import { useActionState } from "react";
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

const NoteForm = () => {
  // form state using unified ActionState
  const [state, formAction, isPending] = useActionState(
    addNote,
    { success: false } as ActionState, // take initiale state
  );

  return (
    <form action={formAction}>
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create New Note
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

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <FieldContent>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="E.g., Grocery List"
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
                  rows={4}
                  placeholder="What do you need to do?"
                  className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none md:text-sm"
                ></textarea>
                {state?.errors?.content && (
                  <FieldError>{state.errors.content[0]}</FieldError>
                )}
              </FieldContent>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Creating note..." : "Create Note"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default NoteForm;
