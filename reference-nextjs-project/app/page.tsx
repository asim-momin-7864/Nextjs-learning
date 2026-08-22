import Link from 'next/link';

export default function Home() {
  // This is a static Server Component (the default). It will be prerendered.
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-130px)] px-4">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6 text-center">
        Welcome to <span className="text-blue-600">NotesApp</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl text-center mb-10">
        A complete, educational CRUD application demonstrating modern Next.js 16+ conventions, React 19 Server Actions, and Drizzle ORM.
      </p>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link 
          href="/register" 
          className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-medium transition text-center"
        >
          Get Started
        </Link>
        <Link 
          href="/login" 
          className="bg-white text-blue-600 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-medium transition text-center"
        >
          Login to your account
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next.js 16</h3>
          <p className="text-gray-600">Using the latest App Router features, layouts, and server-first architecture.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">React 19</h3>
          <p className="text-gray-600">Leveraging useActionState, useFormStatus, and seamless Server Actions.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">PostgreSQL & Drizzle</h3>
          <p className="text-gray-600">Type-safe SQL queries with Drizzle ORM directly in Server Components.</p>
        </div>
      </div>
    </div>
  );
}
