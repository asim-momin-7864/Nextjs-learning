/**
 * @file page.tsx
 * @description Root page — the Micro-Blog Dashboard home.
 *
 * THIS IS A SERVER COMPONENT (no "use client").
 * It renders static HTML structure and delegates interactive pieces to
 * Client Components (<PostList> and <CreatePostForm>).
 *
 * WHY CAN'T WE CALL useQuery HERE?
 * Server Components execute on the server — React hooks (including all
 * TanStack Query hooks) are client-only. If you tried to call `usePosts()`
 * here, Next.js would throw: "You're importing a component that needs
 * useState. It only works in a Client Component."
 *
 * HOW DATA FLOWS:
 * For this demo, we rely on client-side fetching:
 *   page.tsx (Server) → <PostList> (Client) → usePosts() → TanStack Query → Axios
 *
 * For production apps that need SEO or faster initial paint, you would also
 * add server-side prefetching (HydrationBoundary pattern), but that is
 * intentionally out of scope for this reference architecture.
 *
 * AUTH STORE DISPLAY:
 * We render the Auth Store Debug panel using a small inline Client Component
 * so we can read from the Zustand store. Zustand state is client-only.
 */

import { PostList } from "@/components/posts/post-list";
import { CreatePostForm } from "@/components/posts/create-post-form";
import { AuthDebugPanel } from "@/components/auth-debug-panel";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      {/* ------------------------------------------------------------------ */}
      {/* Page Header                                                          */}
      {/* ------------------------------------------------------------------ */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Micro-Blog Dashboard
        </h1>
        <p className="text-muted-foreground text-sm">
          Reference Architecture: Next.js 15 · TanStack Query v5 · Axios ·
          Zustand · RHF · Zod · Shadcn UI
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Zustand Auth Debug Panel (Client Component)                          */}
      {/* ------------------------------------------------------------------ */}
      <AuthDebugPanel />

      {/* ------------------------------------------------------------------ */}
      {/* Main Content: Two-column layout on larger screens                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        {/* Left: Create Post Form */}
        <aside>
          <CreatePostForm />
        </aside>

        {/* Right: Post List */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Recent Posts</h2>
          <PostList />
        </section>
      </div>
    </main>
  );
}
