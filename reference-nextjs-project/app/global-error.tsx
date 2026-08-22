'use client'; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    // global-error must include html and body tags since it replaces the root layout when active
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">A critical error occurred!</h2>
            <p className="text-gray-600 mb-6">{error.message || 'Something went completely wrong.'}</p>
            <button
              onClick={() => retry()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
