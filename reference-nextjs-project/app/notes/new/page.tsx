'use client';

import { useActionState } from 'react';
import { createNote } from '@/app/actions/notes';
import Link from 'next/link';

const initialState = {
  error: '',
  details: {} as Record<string, string[] | undefined>,
};

export default function NewNotePage() {
  const [state, formAction, pending] = useActionState(createNote, initialState);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Note</h1>
        <Link href="/notes" className="text-blue-600 hover:underline">Back to Notes</Link>
      </div>

      <form action={formAction} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            id="title" 
            name="title" 
            type="text" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.details?.title && <p className="text-red-500 text-xs mt-1">{state.details.title[0]}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select 
            id="category" 
            name="category" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Ideas">Ideas</option>
          </select>
          {state?.details?.category && <p className="text-red-500 text-xs mt-1">{state.details.category[0]}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select 
            id="priority" 
            name="priority" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {state?.details?.priority && <p className="text-red-500 text-xs mt-1">{state.details.priority[0]}</p>}
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
          <input 
            id="imageUrl" 
            name="imageUrl" 
            type="url" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.details?.imageUrl && <p className="text-red-500 text-xs mt-1">{state.details.imageUrl[0]}</p>}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea 
            id="content" 
            name="content" 
            required 
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {state?.details?.content && <p className="text-red-500 text-xs mt-1">{state.details.content[0]}</p>}
        </div>

        {state?.error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
            {state.error}
          </div>
        )}

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={pending}
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  );
}
