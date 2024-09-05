import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => api.todo.getTodos(),
  });
};

// 특정 ID의 할 일을 가져오는 훅
export const useTodo = (id: number) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => api.todo.getTodo(id),
    enabled: !!id,
  });
};
