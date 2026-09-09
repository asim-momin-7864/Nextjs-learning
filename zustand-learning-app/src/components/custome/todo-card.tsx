import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { TodoType } from "./display-todo";

// prop type declare
interface TodoProp {
  taskData: TodoType;
}

const TodoCard = ({ taskData }: TodoProp) => {
  return (
    <div className="flex gap-2 w-full items-center border bg-primary/5 border-secondary p-2 rounded-lg">
      <Checkbox checked={taskData.isCompleted} />
      <span className="flex flex-col flex-1">
        <p className="text-lg">{taskData.task}</p>
        <p className="text-sm font-mono text-muted-foreground">
          Date: {taskData.createdAt.toLocaleDateString()}
        </p>
      </span>

      <Button variant={"default"} size={"lg"}>
        Edit
      </Button>
      <Button variant={"default"} size={"lg"}>
        Delete
      </Button>
    </div>
  );
};

export default TodoCard;
