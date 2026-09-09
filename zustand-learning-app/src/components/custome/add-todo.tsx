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
    <div className="flex gap-2 w-full">
      <Input
        placeholder="Add TODO task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // extra functionality by enter key also add task
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            handleOnSubmit();
          }
        }}
      />
      <Button variant="default" size={"lg"} onClick={handleOnSubmit}>
        Add
      </Button>
    </div>
  );
};

export default AddTodo;
