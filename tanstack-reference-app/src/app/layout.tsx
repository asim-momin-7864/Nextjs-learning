/**
 * @file layout.tsx
 * @description Root layout — the single HTML shell for the entire Next.js app.
 *
 * WHY IS QueryProvider HERE (not in page.tsx)?
 * The layout.tsx is a Server Component that wraps every route in the app.
 * By placing <QueryProvider> here, all pages and their child Client Components
 * share the same QueryClient instance, enabling:
 *  - Cross-page cache sharing (navigate back to a page, data is still cached).
 *  - Centralized query/mutation configuration (staleTime, retry logic, etc.).
 *
 * WHY CAN A SERVER COMPONENT RENDER A CLIENT COMPONENT?
 * Server Components CAN render Client Components — they just can't use
 * hooks or browser APIs themselves. The boundary is: once a component is
 * marked "use client", all its children are also treated as client-side.
 * `QueryProvider` is "use client", but THIS file (layout.tsx) is a Server Component.
 * This is the correct pattern — keep the Server Component shell large and
 * push "use client" as deep (as small) as possible.
 *
 * SONNER <Toaster>:
 * Toaster must be rendered once, at the top of the tree. It listens for
 * `toast()` calls from anywhere in the component tree and displays them.
 * It is a Client Component, so it's imported from sonner (which handles that).
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/lib/query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Micro-Blog Dashboard | Reference Architecture",
  description:
    "A reference implementation of Next.js 15 + TanStack Query v5 + Axios + Zod + React Hook Form + Zustand + Shadcn UI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {/*
         * QueryProvider wraps the entire app tree.
         * It is a "use client" component, but its children (like page.tsx)
         * remain Server Components — Next.js handles this boundary correctly.
         */}
        <QueryProvider>
          {children}
        </QueryProvider>

        {/*
         * <Toaster> renders the Sonner toast container.
         * It must be inside <body> but outside any conditional rendering.
         * `position="top-right"` and `richColors` give us colored success/error toasts.
         */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
