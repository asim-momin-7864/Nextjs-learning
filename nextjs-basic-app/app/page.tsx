import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 min-h-[calc(100vh-150px)]">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-600 mb-6 text-center">
        Welcome to <span className="text-blue-600">NotesApp</span>
      </h1>
      <p className="tetx-xl text-gray-600 max-w-2xl text-center mb-10 mx-auto">
        A complete, educational CRUD application demonstrating modern Next.js
        16+ conventions, React 19 Server Actions, and Drizzle ORM.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mx-auto">
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
    </div>
  );
}
