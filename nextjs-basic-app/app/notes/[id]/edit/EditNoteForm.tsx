"use client";

import { useActionState } from "react";
import { updateNote } from "@/app/actions/notes";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
  error: "",
  details: undefined,
};

export default function EditNoteForm({
  note,
}: {
  note: {
    id: string;
    title: string;
    content: string;
    category: string;
    imageUrl: string | null;
    [key: string]: unknown; // allow extra DB fields
  };
}) {
  const updateNoteWithId = updateNote.bind(null, note.id);
  const [state, formAction, pending] = useActionState(
    updateNoteWithId,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={note.title}
          required
          className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.details?.properties?.title?.errors && (
          <p className="text-red-500 text-xs mt-1">
            {state.details.properties.title.errors[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={note.category}
          className="w-full border border-gray-300 p-2.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
        {state?.details?.properties?.category?.errors && (
          <p className="text-red-500 text-xs mt-1">
            {state.details.properties.category.errors[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Image URL (Optional)
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={note.imageUrl || ""}
          className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
        />
        {state?.details?.properties?.imageUrl?.errors && (
          <p className="text-red-500 text-xs mt-1">
            {state.details.properties.imageUrl.errors[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={5}
          defaultValue={note.content}
          className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
        {state?.details?.properties?.content?.errors && (
          <p className="text-red-500 text-xs mt-1">
            {state.details.properties.content.errors[0]}
          </p>
        )}
      </div>

      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}

      <div className="flex justify-between items-center pt-2">
        <Link href={`/notes/${note.id}`} className="text-sm text-gray-500 hover:underline">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
