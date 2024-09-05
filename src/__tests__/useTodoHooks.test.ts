import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import "dotenv/config";
import { useTodo, useTodos } from "../hooks/useTodoHooks";
// Jest로 useQuery를 mock
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockTodo = {
  title: "Test Todo",
  userId: 1,
  completed: false,
  id: 1,
};
const mockTodos = [
  {
    title: "Test Todo",
    userId: 1,
    completed: false,
    id: 1,
  },
  {
    title: "Test Todo2",
    userId: 2,
    completed: false,
    id: 2,
  },
  {
    title: "Test Todo3",
    userId: 3,
    completed: false,
    id: 3,
  },
  {
    title: "Test Todo4",
    userId: 4,
    completed: false,
    id: 4,
  },
];

describe("useTodo hook", () => {
  test("로딩 리턴", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: true,
      isError: false,
      data: undefined,
    }));

    const { result } = renderHook(() => useTodo(3));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  test("에러 리턴", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      isError: true,
      data: undefined,
    }));

    const { result } = renderHook(() => useTodo(3));
    const { result: todosError } = renderHook(() => useTodos());

    expect(result.current.isError).toBe(true);
    expect(todosError.current.isError).toBe(true);
  });

  test("useTodo 데이터 리턴", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: mockTodo,
    }));
    const { result: todoResult } = renderHook(() => useTodo(3));
    expect(todoResult.current.data).toEqual(mockTodo);
    expect(todoResult.current.isLoading).toBe(false);
  });
  test("useTodos 데이터 리턴", () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: mockTodos,
    }));

    const { result: todosResult } = renderHook(() => useTodos());

    expect(todosResult.current.data).toEqual(mockTodos);
    expect(todosResult.current.isLoading).toBe(false);
  });
});
