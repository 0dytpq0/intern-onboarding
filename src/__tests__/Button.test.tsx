import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../components/atom/Button";

describe("Button 컴포넌트 테스트", () => {
  test("기본 렌더링", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /Click Me/i });

    // 기본 클래스 적용 확인
    expect(buttonElement).toHaveClass(
      "border-purple-500",
      "px-4",
      "py-1.5",
      "text-[15px]",
      "bg-purple-500",
      "text-white"
    );
  });

  test("intent, size, variant 속성에 따른 렌더링", () => {
    render(
      <Button intent="danger" size="lg" variant="outline">
        Danger
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /Danger/i });

    // Danger, large, outline 속성에 따른 클래스 확인
    expect(buttonElement).toHaveClass(
      "border-rose-500",
      "px-5",
      "py-2",
      "text-[17px]",
      "text-rose-500",
      "bg-white"
    );
  });

  test("버튼 클릭 이벤트", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /Click Me/i });

    // 클릭 이벤트 실행
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
