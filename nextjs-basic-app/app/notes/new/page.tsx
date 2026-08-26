"use client";

import { useActionState } from "react";
import { createNote } from "@/app/actions/notes";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
  error: "",
  details: undefined,
};

export default function NewNotePage() {
  const [state, formAction, pending] = useActionState(createNote, initialState);

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Create New Note</h1>
        <Link
          href="/notes"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          &larr; Back to Notes
        </Link>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="E.g. Project meeting notes"
          />
          {state?.details?.properties?.title?.errors && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              {state.details.properties.title.errors[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="w-full border border-gray-300 p-2.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
            {state?.details?.properties?.category?.errors && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                {state.details.properties.category.errors[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              className="w-full border border-gray-300 p-2.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {state?.details?.properties?.priority?.errors && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                {state.details.properties.priority.errors[0]}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="https://example.com/image.jpg"
          />
          {state?.details?.properties?.imageUrl?.errors && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              {state.details.properties.imageUrl.errors[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows={5}
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
            placeholder="Write your note content here..."
          />
          {state?.details?.properties?.content?.errors && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              {state.details.properties.content.errors[0]}
            </p>
          )}
        </div>

        {state?.error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {pending ? "Saving..." : "Save Note"}
        </button>
      </form>
    </div>
  );
}
