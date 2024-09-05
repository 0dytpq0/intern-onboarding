import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Input from "../components/atom/Input";

const mockValidator = jest.fn((value: string) => {
  if (value === "a") return "잘못된 비밀번호입니다.";
  return null;
});

describe("Input 컴포넌트 테스트", () => {
  const mockSetInputValue = jest.fn();
  const mockHandleSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("기본 렌더링", () => {
    render(
      <Input
        inputValue=""
        setInputValue={mockSetInputValue}
        label="아이디"
        formType="login"
        validator={mockValidator}
      />
    );

    expect(screen.getByLabelText("아이디")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("focus 상태 css 테스트", () => {
    render(
      <Input
        type="text"
        inputValue=""
        setInputValue={mockSetInputValue}
        label="아이디"
        formType="login"
        validator={mockValidator}
      />
    );

    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");

    act(() => fireEvent.focus(inputElement));

    expect(buttonElement).toHaveClass("transform translate-y-[10px]");
  });

  // test("유효성 검사 및 경고 메시지", () => {
  //   render(
  //     <Input
  //       inputValue=""
  //       setInputValue={mockSetInputValue}
  //       label="비밀번호"
  //       formType="login"
  //       validator={mockValidator}
  //     />
  //   );

  //   const inputElement = screen.getByRole("textbox");

  //   fireEvent.change(inputElement, { target: { value: "a" } });
  //   expect(screen.getByText("잘못된 비밀번호입니다.")).toBeInTheDocument();
  // });

  test("엔터 입력 시 handleSubmit 호출", () => {
    render(
      <Input
        inputValue="test"
        setInputValue={mockSetInputValue}
        formType="login"
        handleSubmit={mockHandleSubmit}
        validator={mockValidator}
      />
    );

    const inputElement = screen.getByRole("textbox");

    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("다음 버튼 클릭 시 handleSubmit 호출", () => {
    render(
      <Input
        inputValue="test"
        setInputValue={mockSetInputValue}
        formType="login"
        handleSubmit={mockHandleSubmit}
        validator={mockValidator}
      />
    );

    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});
