import { useNavigate } from "react-router-dom";
import Button from "../components/atom/Button";
import { useTodos } from "../hooks/useTodoHooks";
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function HomePage() {
  const navigate = useNavigate();
  // 전체 가져오는 로직

  const { data: todos } = useTodos();
  console.log("todos", todos);
  const TodoList = (todo: Todo) => {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="w-full h-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-xl font-semibold text-gray-800">
            Todo List
          </h1>
          <div className="pb-4 border-b">
            <h2 className="text-lg font-medium text-gray-700">{todo.title}</h2>
            <p className="text-sm text-gray-500">User ID: {todo.userId}</p>
            <p className="text-sm text-gray-500">
              Completed: {todo.completed ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-screen mx-auto">
      {todos && (
        <div className="grid grid-cols-4 gap-4 p-8 bg-gray-100">
          {todos?.map((todo: Todo, idx: number) => {
            if (idx <= 15) {
              return TodoList(todo);
            }
          })}
        </div>
      )}
      <div className="absolute top-5 right-5">
        <Button onClick={() => navigate("/user")}>마이 페이지</Button>
      </div>
    </div>
  );
}

export default HomePage;
