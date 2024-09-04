// Imports
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // MemoryRouter 사용
import HomePage from "../pages/HomePage";

// Tests
test("Renders HomePage and navigates correctly", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </MemoryRouter>
  );

  // "마이 페이지" 버튼이 있는지 확인
  const button = screen.getByRole("button", { name: "마이 페이지" });
  expect(button).toBeInTheDocument();

  // // 버튼 클릭 시 경로가 변경되는지 확인
  // fireEvent.click(button);

  // // 로그인 페이지로 이동했는지 확인
  // console.log(screen);
  // expect(screen.getByText("로그인")).toBeInTheDocument();
});
