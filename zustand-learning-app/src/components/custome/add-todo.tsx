"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import useTodoStore from "@/lib/todo-store";

const AddTodo = () => {
  // input state (for mini form we are not using RHF)
  const [input, setInput] = useState<string>("");
  const addTaskFunction = useTodoStore((state) => state.addTaskFunction);

  // handle submit
  const handleOnSubmit = () => {
    const newTask = input.trim();
    if (newTask === "") return;

    // zustand add func
    addTaskFunction(newTask);

    setInput("");
  };

  return (
    <div className="flex gap-3 w-full">
      <Input
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // extra functionality by enter key also add task
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            handleOnSubmit();
          }
        }}
        className="h-14 text-lg px-5 bg-primary/5 border-primary/10 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:border-primary/10 shadow-2xs rounded-xl transition-all placeholder:text-muted-foreground/70"
      />
      <Button
        variant="default"
        className="h-14 px-8 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95"
        onClick={handleOnSubmit}
      >
        Add Task
      </Button>
    </div>
  );
};

export default AddTodo;
