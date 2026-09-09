"use client";
import TodoCard from "./todo-card";
import useTodoStore from "@/lib/todo-store";

export type TodoType = {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: Date;
};

const DisplayTodo = () => {
  // tasks from store to display
  const todos = useTodoStore((state) => state.todos);

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      {todos.map((task) => (
        <TodoCard key={task.id} taskData={task} />
      ))}
    </div>
  );
};

export default DisplayTodo;
