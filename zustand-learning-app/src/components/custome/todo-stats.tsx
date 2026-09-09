import React from "react";
import { Badge } from "../ui/badge";

const TodoStats = () => {
  return (
    <div className="flex gap-5 w-full items-center">
      <Badge variant="outline" className="text-lg p-4">
        Total: 10
      </Badge>
      <Badge variant="default" className="text-lg p-4">
        Active: 2
      </Badge>
      <Badge variant="outline" className="text-lg p-4">
        Completed: 8
      </Badge>
    </div>
  );
};

export default TodoStats;
