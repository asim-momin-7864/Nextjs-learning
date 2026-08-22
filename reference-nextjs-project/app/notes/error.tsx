'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; // standard 'reset' function in Next.js error boundary
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="py-12 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to load notes!</h2>
      <p className="text-gray-600 mb-6">{error.message || 'Something went wrong.'}</p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </div>
  );
}
