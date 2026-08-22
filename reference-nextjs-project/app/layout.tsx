import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { logout } from '@/app/actions/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js 16 Notes App',
  description: 'A complete CRUD application built with Next.js 16 and React 19',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check auth status on the server for the navigation bar
  const session = await getSession();
  const isLoggedIn = !!session?.userId;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <nav className="bg-slate-900 shadow-sm border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center text-xl font-bold text-blue-400">
                  NotesApp
                </Link>
                {isLoggedIn && (
                  <div className="ml-6 flex items-center space-x-4">
                    <Link href="/notes" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      My Notes
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <form action={logout}>
                    <button type="submit" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Logout
                    </button>
                  </form>
                ) : (
                  <>
                    <Link href="/login" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Login
                    </Link>
                    <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md text-sm font-medium transition">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-slate-400 text-sm">
          Built with Next.js 16 and React 19
        </footer>
      </body>
    </html>
  );
}
