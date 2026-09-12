# 📚 TanStack Reference App — Build Roadmap

> Read & build this app **layer by layer, feature by feature**.  
> Each layer builds on the previous. Never skip ahead.

---

## 🗺️ The Big Picture

```
Layer 1 — Project Config        (package.json, tsconfig, next.config)
Layer 2 — Styling Foundation    (globals.css)
Layer 3 — Data Schemas          (lib/schemas.ts)
Layer 4 — API Layer             (lib/api.ts)
Layer 5 — Server Provider       (lib/query-provider.tsx)
Layer 6 — Global State          (store/use-auth-store.ts)
Layer 7 — App Shell             (app/layout.tsx)
Layer 8 — UI Primitives         (components/ui/*)
Layer 9 — Data Hooks            (hooks/*)
Layer 10 — Feature Components   (components/posts/*)
Layer 11 — Pages                (app/page.tsx)
Layer 12 — Debug / DX           (components/auth-debug-panel.tsx)
```

---

## Layer 1 — Project Config

> **What you learn:** What tools this app uses and why.

| File                                                                                                      | Read for                                                                                       |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`package.json`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/package.json)     | All dependencies — Next.js 16, TanStack Query v5, Zustand, React Hook Form, Zod, Shadcn, Axios |
| [`tsconfig.json`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/tsconfig.json)   | Path aliases (`@/*` → `src/*`), strict mode                                                    |
| [`next.config.ts`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/next.config.ts) | Next.js compiler options, React Compiler flag                                                  |

**Key concepts:** dependency roles, TypeScript path aliases, compiler plugins.

---

## Layer 2 — Styling Foundation

> **What you learn:** Design tokens, global resets, CSS variables.

| File                                                                                                                | Read for                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`src/app/globals.css`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/app/globals.css) | Tailwind v4 directives, CSS custom properties (colors, radius, spacing), dark mode tokens |

**Key concepts:** Tailwind v4 `@theme` block, design token system, dark mode via class strategy.

---

## Layer 3 — Data Schemas (Zod)

> **What you learn:** Define the shape of data **before** touching any API or UI.

| File                                                                                                              | Read for                                                                                             |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`src/lib/schemas.ts`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/lib/schemas.ts) | Zod schemas for `Post`, `CreatePost`, form validation rules. TypeScript types inferred from schemas. |

**Key concepts:** `z.object()`, `z.infer<>`, schema-driven types, validation rules.

> ✅ **Build exercise:** Write the schemas file from scratch. Define a `Post` type with `id`, `title`, `body`, `userId`. Add a `createPostSchema` with min-length validation.

---

## Layer 4 — API Layer (Axios)

> **What you learn:** Centralized HTTP client, typed API functions.

| File                                                                                                      | Read for                                                                                |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [`src/lib/api.ts`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/lib/api.ts) | Axios instance setup, `getPosts()`, `createPost()` functions — all typed with Zod types |

**Key concepts:** `axios.create()`, base URL config, typed response generics, error handling.

> ✅ **Build exercise:** Create the `api.ts` file. Write `getPosts()` and `createPost()` using the schemas from Layer 3.

---

## Layer 5 — Query Provider (TanStack Query)

> **What you learn:** How TanStack Query is wired into the React tree.

| File                                                                                                                              | Read for                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`src/lib/query-provider.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/lib/query-provider.tsx) | `QueryClient` setup, `QueryClientProvider`, default options (staleTime, retry), ReactQueryDevtools integration |

**Key concepts:** `QueryClient` config, `staleTime` vs `cacheTime`, devtools, "use client" boundary.

> ✅ **Build exercise:** Create a `QueryProvider` component that wraps children. Configure `staleTime: 5 * 60 * 1000`.

---

## Layer 6 — Global State (Zustand)

> **What you learn:** Lightweight global state — no Redux boilerplate.

| File                                                                                                                                | Read for                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`src/store/use-auth-store.ts`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/store/use-auth-store.ts) | Zustand store for auth state (`userId`, `isLoggedIn`), actions (`login`, `logout`) |

**Key concepts:** `create()` from Zustand, store slices, typed store hooks.

> ✅ **Build exercise:** Create `use-auth-store.ts`. Store a `userId: number | null`. Add `login(id)` and `logout()` actions.

---

## Layer 7 — App Shell (Next.js Layout)

> **What you learn:** Root layout wiring — providers, fonts, theme, metadata.

| File                                                                                                              | Read for                                                                                               |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`src/app/layout.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/app/layout.tsx) | Root layout wrapping `QueryProvider`, `ThemeProvider`, Toaster. `metadata` export for SEO. Font setup. |

**Key concepts:** Next.js App Router layout pattern, provider composition, `metadata` object, `next-themes`.

> ✅ **Build exercise:** Create `layout.tsx`. Wrap children in `QueryProvider`. Add a `metadata` export with title and description.

---

## Layer 8 — UI Primitives (Shadcn / Base UI)

> **What you learn:** Reusable, unstyled-to-styled component primitives.

Read these **in order** — simpler to more complex:

| File                                                                                                                                      | Read for                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [`src/components/ui/label.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/ui/label.tsx)       | Simplest primitive — label with variant styles             |
| [`src/components/ui/input.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/ui/input.tsx)       | Styled input, `cn()` utility, forwarded refs               |
| [`src/components/ui/button.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/ui/button.tsx)     | Button with variants (`variant`, `size`) using `cva()`     |
| [`src/components/ui/skeleton.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/ui/skeleton.tsx) | Loading placeholder with pulse animation                   |
| [`src/components/ui/card.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/ui/card.tsx)         | Card layout with `CardHeader`, `CardContent`, `CardFooter` |
| [`src/components/ui/sonner.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/ui/sonner.tsx)     | Toast notifications wired to `next-themes`                 |
| [`src/components/ui/toast.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/ui/toast.tsx)       | Toast primitives from Base UI                              |
| [`src/components/ui/form.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/ui/form.tsx)         | Form primitives that connect React Hook Form context to UI |

**Key concepts:** `cva()` for variant-based styling, `cn()` for class merging, `React.forwardRef`, compound components.

> ✅ **Build exercise:** Don't write these manually — run `npx shadcn add button card form input label skeleton sonner`. Then **read** the generated files to understand the patterns.

---

## Layer 9 — Data Hooks (TanStack Query)

> **What you learn:** How to fetch and mutate data with caching, loading states, and optimistic updates.

| File                                                                                                                                  | Read for                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`src/hooks/use-posts.ts`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/hooks/use-posts.ts)             | `useQuery` — fetching posts list, query key design, loading/error states                                     |
| [`src/hooks/use-create-post.ts`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/hooks/use-create-post.ts) | `useMutation` — creating a post, `onSuccess` cache invalidation, optimistic patterns, toast on success/error |

**Key concepts:**

- `useQuery({ queryKey, queryFn })` — the fetch hook
- `useMutation({ mutationFn, onSuccess, onError })` — the write hook
- `queryClient.invalidateQueries()` — cache invalidation after mutation
- Query key arrays — `['posts']` vs `['posts', userId]`

> ✅ **Build exercise:**
>
> 1. Write `use-posts.ts` — call `getPosts()` from api.ts, expose `{ data, isLoading, isError }`
> 2. Write `use-create-post.ts` — call `createPost()`, on success invalidate `['posts']` and show a toast

---

## Layer 10 — Feature Components

> **What you learn:** How to compose hooks + UI primitives into real features.

| File                                                                                                                                                            | Read for                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`src/components/posts/post-list.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/posts/post-list.tsx)               | Consumes `usePosts()`. Renders loading skeleton, error state, and post cards.       |
| [`src/components/posts/create-post-form.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/posts/create-post-form.tsx) | React Hook Form + Zod validation + `useCreatePost()` mutation. Full form lifecycle. |

**Key concepts:**

- Conditional rendering: `isLoading` → skeleton, `isError` → error UI, `data` → list
- `useForm<T>({ resolver: zodResolver(schema) })` pattern
- `form.handleSubmit()`, `form.formState.errors`, `form.reset()`
- Connecting `FormField` → `FormControl` → `Input` from Shadcn form primitives

> ✅ **Build exercise:**
>
> 1. `post-list.tsx` — map over posts, show skeleton (3 items) while loading
> 2. `create-post-form.tsx` — form with title + body fields, zod validation, submit calls mutation

---

## Layer 11 — The Page

> **What you learn:** How everything composes together in a Next.js page.

| File                                                                                                          | Read for                                                                                                      |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`src/app/page.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/app/page.tsx) | Combines `PostList` + `CreatePostForm`. Uses Zustand auth store to simulate user sessions. Page-level layout. |

**Key concepts:** Page as an orchestrator (not logic container), auth-gating with Zustand, layout structure.

> ✅ **Build exercise:** Compose `PostList` and `CreatePostForm` on the page. Add a toggle button that simulates login/logout using `useAuthStore`.

---

## Layer 12 — Debug Panel (DX Tool)

> **What you learn:** Dev-only panels for inspecting app state.

| File                                                                                                                                                | Read for                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`src/components/auth-debug-panel.tsx`](file:///Users/asimmomin7864/Dev/Nextjs-learning/tanstack-reference-app/src/components/auth-debug-panel.tsx) | Shows current Zustand auth state in a floating panel. Dev-only component pattern. |

**Key concepts:** Debug-only UI, reading Zustand state outside of feature components.

---

## 🧠 Dependency Map (mental model)

```
package.json
    │
    ├── globals.css          (design tokens)
    │
    ├── schemas.ts           (data shapes)
    │       │
    │       └── api.ts       (HTTP calls, uses schemas)
    │               │
    │               └── hooks/
    │                   ├── use-posts.ts        (useQuery)
    │                   └── use-create-post.ts  (useMutation)
    │
    ├── query-provider.tsx   (TanStack Query client)
    ├── use-auth-store.ts    (Zustand global state)
    │
    ├── components/ui/*      (primitives, no business logic)
    │
    └── components/posts/*   (features, use hooks + ui)
            │
            └── app/page.tsx (composes everything)
```

---

## ⚡ Tech Stack Quick Reference

| Library               | Role                            | Key file                                         |
| --------------------- | ------------------------------- | ------------------------------------------------ |
| **Next.js 16**        | App framework, routing          | `app/layout.tsx`, `app/page.tsx`                 |
| **TanStack Query v5** | Server state (fetch/cache/sync) | `hooks/use-posts.ts`, `hooks/use-create-post.ts` |
| **Zustand v5**        | Client global state             | `store/use-auth-store.ts`                        |
| **React Hook Form**   | Form state + submission         | `components/posts/create-post-form.tsx`          |
| **Zod v4**            | Schema validation + TS types    | `lib/schemas.ts`                                 |
| **Axios**             | HTTP client                     | `lib/api.ts`                                     |
| **Shadcn / Base UI**  | UI component primitives         | `components/ui/*`                                |
| **Sonner**            | Toast notifications             | `components/ui/sonner.tsx`                       |
| **next-themes**       | Dark/light mode                 | `app/layout.tsx`                                 |
| **Tailwind v4**       | Styling                         | `app/globals.css`                                |

---

> 💡 **Golden Rule:** Always read the hook before reading the component that uses it.  
> Always read the schema before reading the API function that uses it.  
> Bottom-up reading = real understanding.

---

Let me check the current caching setup first.

Viewed query-provider.tsx:1-120
Viewed use-posts.ts:1-70

Your caching **is implemented correctly** — but you're misunderstanding what TanStack Query's cache covers. Here's the full picture:

---

## What's happening and why

### TanStack Query cache = **in-memory only**

```
Browser Tab (memory)
│
└── QueryClient
    └── cache: { ["posts"]: { data: [...], updatedAt: ... } }
                                    ↑
                           Lives HERE — in RAM
```

When you **refresh the page** (`F5` / `Cmd+R`):

- The entire JavaScript runtime is **destroyed and restarted**
- The `QueryClient` instance is **recreated fresh** — empty cache
- So yes, it fires a new network request every time. **This is expected.**

### What `staleTime: 60 * 1000` actually prevents

It prevents redundant requests **within the same session**, for example:

- Component A mounts → fetches posts → caches them
- Component B mounts 30 seconds later → **no new request**, uses cache
- You navigate away and back → **no new request**, uses cache (within 60s)

---

## The 3 types of caching — where they live

| Cache Type                     | Survives Refresh? | Who controls it                    |
| ------------------------------ | ----------------- | ---------------------------------- |
| **TanStack Query** (in-memory) | ❌ No             | Your app                           |
| **HTTP Cache** (browser)       | ✅ Yes            | Server `Cache-Control` headers     |
| **Persistence** (localStorage) | ✅ Yes            | You opt-in with a persister plugin |

---

## Why JSONPlaceholder always re-requests

Your API is `jsonplaceholder.typicode.com`. Even though the browser HTTP cache could theoretically cache it, JSONPlaceholder returns `Cache-Control: no-cache` headers — so the browser always re-fetches.

---

## Want cache that survives refresh? Two options:

**Option A — Add a TanStack Query persister** (saves cache to `localStorage`)
This is the proper solution if you want to rebuild with persist support.

**Option B — It's a learning/reference app, so this is fine as-is.**
Real-world APIs send proper `Cache-Control` headers and the browser HTTP cache handles it at the network layer automatically.

---

> **Short answer:** Your caching works exactly as designed. Refresh = new session = new request. That's not a bug, that's how in-memory cache works. Within a session (navigating, re-renders, component mounts within `staleTime`) — no extra requests are fired.
