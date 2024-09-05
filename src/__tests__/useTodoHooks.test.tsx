import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import "dotenv/config";
import { PropsWithChildren } from "react";
import { useTodo, useTodos } from "../hooks/useTodoHooks";

describe("useTodos hook", () => {
  test("useTodos 데이터 테스트", async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useTodos(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeDefined();
    expect(result.current.data.length).toBe(200);
  });

  test("useTodos 데이터 테스트", async () => {
    const queryClient = new QueryClient();
    const compareObj = {
      completed: false,
      id: 3,
      title: "fugiat veniam minus",
      userId: 1,
    };
    const wrapper = ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useTodo(3), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeDefined();
    expect(result.current.data).toEqual(compareObj);
  });
});
