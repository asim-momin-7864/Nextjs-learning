// actions for notes
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

// create note scheam
export const CreateNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string(),
});

export type NoteType = z.infer<typeof CreateNoteSchema>;

// func for add notes
export const addNote = async (prev: NoteType[], formData: FormData) => {
  // parse
  const { title, content } = CreateNoteSchema.parse(formData);

  // supabase instance
  const supabase = await createClient();
  const response = await supabase.from("notes").insert({
    title,
    content,
  });

  // update cache
  revalidatePath("/notes");
};
