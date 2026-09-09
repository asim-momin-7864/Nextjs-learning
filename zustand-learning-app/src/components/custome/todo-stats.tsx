"use client";
import { Badge } from "../ui/badge";
import useTodoStore from "@/lib/todo-store";

const TodoStats = () => {
  // By selecting todos, we subscribe to changes and trigger re-renders
  const todos = useTodoStore((state) => state.todos);
  
  // Calculate stats directly from the todos we just selected
  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.isCompleted).length,
    completed: todos.filter((t) => t.isCompleted).length,
  };

  return (
    <div className="flex gap-5 w-full items-center">
      <Badge variant="outline" className="text-lg p-4">
        Total: {stats.total}
      </Badge>
      <Badge variant="default" className="text-lg p-4">
        Active: {stats.active}
      </Badge>
      <Badge variant="outline" className="text-lg p-4">
        Completed: {stats.completed}
      </Badge>
    </div>
  );
};

export default TodoStats;
