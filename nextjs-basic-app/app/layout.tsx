import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "./actions/auth";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 16 Notes App",
  description: "A complete CRUD application built with Next.js 16 and React 19",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // navigation bar
  const session = await getSession();
  const isLoggedIn = Boolean(session?.userId);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}
      >
        <nav className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900 text-white">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-lg text-blue-400 ">
              NotesApp
            </Link>
            {isLoggedIn && (
              <Link
                href="/notes"
                className="text-gray-300 hover:text-white text-sm"
              >
                My Notes
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm">
            {isLoggedIn ? (
              <form action={logout}>
                <button type="submit" className="text-red-400 hover:underline">
                  Logout
                </button>
              </form>
            ) : (
              <>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
        <main className="flex-grow">{children}</main>
        <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-slate-400 text-sm">
          Built with Nextjs 16 and React 19
        </footer>
      </body>
    </html>
  );
}
