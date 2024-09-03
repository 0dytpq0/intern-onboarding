import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function DefaultLayout() {
  // 컴포넌트의 생애주기와 의존성 배열에 담긴 값의 변화에 따라
  // 함수를 실행해 주는 훅
  // mount -> update -> unmount

  // 레이아웃은 왜 짤까?
  // 공통된 UI를 만들기 위해 + 공통된 비즈니스 로직(ex, 로그인 여부 확인)을 실행하기 위해.
  useEffect(() => {
    console.log("나 마운트됨");

    return () => {
      console.log("나 언마운트댐");
    };

    // useEffect의 인자는 보통 2개(함수, 의존성 배열)를 넣는다.
  }, []);

  return (
    <div>
      <Link to="/">홈페이지</Link>
      <br />
      <Link to="/posts">포스트 목록 페이지</Link>
      <br />
      <Link to="/posts/1">포스트 상세 페이지</Link>

      <Outlet />
    </div>
  );
}

export default DefaultLayout;
