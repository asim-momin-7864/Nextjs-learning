import { createInsertSchema, createUpdateSchema } from "drizzle-orm/zod";
import { notesTable } from "@/db/schema";

// create notes
export const CreateNoteDto = createInsertSchema(notesTable, {
  title: (s) => s.min(5, "Title is required").nonempty("Title is required"),
  content: (s) =>
    s.min(5, "Content is required").nonempty("Content is required"),
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateNoteDto = createUpdateSchema(notesTable).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
