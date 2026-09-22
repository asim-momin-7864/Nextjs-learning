"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string(),
});

export type NoteType = z.infer<typeof CreateNoteSchema>;

// A standard ActionState type used across all form actions
export type ActionState = {
  success: boolean;
  message?: string;
  errors?: {
    title?: string[];
    content?: string[];
  };
};

// it is just a state ---> which shows success, error, message thats it
//* when we pass server action function, the useActionState hook makes formAction and isPending internally handles
/*
NoteDetailManager.tsx (usage)

  const [state, formAction, isPending] = useActionState(updateNote, {
    success: false,
  } as ActionState);
  
*/

// Create a new note
export const addNote = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = CreateNoteSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please verify your inputs.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };

    // why this specific format for return, see what we wrote and in usage page we need this kind too...Promise<ActionState>
    // except for delete there we are not reading "state"
  }

  const { title, content } = validatedFields.data;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "You must be logged in to create a note.",
    };
  }

  const { error } = await supabase.from("notes").insert({
    title,
    content,
    user_id: user.id,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/notes");

  return {
    success: true,
    message: "Note created successfully!",
  };
};

// Update an existing note
export const updateNote = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const id = formData.get("id") as string;
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = CreateNoteSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please verify your inputs.",
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("notes")
    .update({
      title: validatedFields.data.title,
      content: validatedFields.data.content,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath(`/notes/${id}`);
  revalidatePath(`/notes`);

  return {
    success: true,
    message: "Note updated successfully!",
  };
};

// Delete a note
export async function deleteNote(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  const supabase = await createClient();

  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/notes");
  redirect("/notes");
}
