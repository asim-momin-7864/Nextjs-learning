import { create } from "zustand";
import { TodoType } from "@/components/custome/display-todo";
import { persist } from "zustand/middleware";

// type of store
interface TodoStoreType {
  todos: TodoType[];
  addTaskFunction: (task: string) => void;
  deleteTaskFunction: (id: string) => void;
  toggleTaskFunction: (id: string) => void;
  editTaskFunction: (id: string, newTask: string) => void;
}

const useTodoStore = create<TodoStoreType>()(
  persist(
    (set, get) => ({
      todos: [
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
      ],
      addTaskFunction: (newTask) => {
        if (newTask.trim() === "") return;

        const newTodo: TodoType = {
          id: new Date().toString(),
          task: newTask,
          isCompleted: false,
          createdAt: new Date(),
        };

        set((state) => ({
          // we need to pass object
          todos: [...state.todos, newTodo],
        }));
      },

      deleteTaskFunction: (id) => {
        set((state) => ({
          todos: state.todos.filter((task) => task.id !== id),
        }));
      },

      toggleTaskFunction: (id) => {
        set((state) => ({
          todos: state.todos.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
          ),
        }));
      },

      editTaskFunction: (id, newTask) => {
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, task: newTask } : t,
          ),
        }));
      },
    }),
    {
      name: "todo-store",
    },
  ),
);

export default useTodoStore;
