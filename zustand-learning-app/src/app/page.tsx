import AddTodo from "@/components/custome/add-todo";
import DisplayTodo from "@/components/custome/display-todo";
import TodoStats from "@/components/custome/todo-stats";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-y-10 px-16 bg-secondary dark:bg-black sm:items-start">
        <h1 className="text-3xl text-black dark:text-white my-10">TODO App</h1>
        {/* input bar */}
        <AddTodo />
        {/* todo stats */}
        <TodoStats />
        {/* todo lists */}
        <DisplayTodo />
      </main>
    </div>
  );
}
