import React from "react";
import TodoCard from "./todo-card";

export type TodoType = {
  id: string;
  task: string;
  isCompleted: boolean;
  createdAt: Date;
};

const DisplayTodo = () => {
  const todos: TodoType[] = [
    {
      id: "1",
      task: "Task 1",
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      task: "Task 2",
      isCompleted: true,
      createdAt: new Date(),
    },
  ];
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      {todos.map((task) => (
        <TodoCard key={task.id} taskData={task} />
      ))}
    </div>
  );
};

export default DisplayTodo;
