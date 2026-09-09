"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { TodoType } from "./display-todo";
import useTodoStore from "@/lib/todo-store";
import { useState } from "react";
import { Input } from "../ui/input";

// prop type declare
interface TodoProp {
  taskData: TodoType;
}

const TodoCard = ({ taskData }: TodoProp) => {
  // delete func
  const deleteTaskFunction = useTodoStore((state) => state.deleteTaskFunction);
  const toggleTaskFunction = useTodoStore((state) => state.toggleTaskFunction);
  const editTaskFunction = useTodoStore((state) => state.editTaskFunction);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(taskData.task);

  return (
    <div
      className={`flex gap-4 w-full items-center border p-4 rounded-xl transition-all duration-300 ${
        taskData.isCompleted
          ? "bg-muted/50 border-transparent opacity-75 grayscale-[0.5]"
          : "bg-card border-border shadow-2xs hover:shadow-xs"
      }`}
    >
      {isEditing ? (
        <>
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="bg-primary/5 border-primary/20"
          />
          <Button
            onClick={() => {
              if (editText.trim() === "") return;
              editTaskFunction(taskData.id, editText);
              setIsEditing(false);
            }}
          >
            Update
          </Button>
          <Button variant={"destructive"} onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Checkbox
            checked={taskData.isCompleted}
            onCheckedChange={() => toggleTaskFunction(taskData.id)}
          />
          <span className="flex flex-col flex-1">
            <p
              className={`text-lg font-medium transition-all duration-300 ${
                taskData.isCompleted
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {taskData.task}
            </p>
            <p className="text-sm font-mono text-muted-foreground mt-1">
              Date: {new Date(taskData.createdAt).toDateString()}
            </p>
          </span>

          <Button
            variant={"default"}
            size={"lg"}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            variant={"destructive"}
            size={"lg"}
            onClick={() => deleteTaskFunction(taskData.id)}
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default TodoCard;
