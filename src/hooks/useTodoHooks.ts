import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => api.todo.getTodos(),
  });
};

export const useTodo = (id: number) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => api.todo.getTodo(id),
    enabled: !!id,
  });
};
