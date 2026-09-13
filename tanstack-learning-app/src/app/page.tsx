import { PostList } from "@/components/custome/post-list";
import { CreatePostForm } from "@/components/custome/create-post-form";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      {/* header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Micro-Blog Dashboard
        </h1>
      </header>

      {/* main content */}
      <div className="grid gap-8 lg:grid-cols-2">
        <aside>
          <CreatePostForm />
        </aside>

        {/* right */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Recent Posts</h2>
          <PostList />
        </section>
      </div>
    </main>
  );
}
