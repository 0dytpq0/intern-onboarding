import { Outlet, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      // { path: "/", element: <HomePage /> },
      // {
      //   path: "/posts/:postId", // :postId(ex, :1 , :2) is a dynamic parameter -> 동적 라우터
      //   element: <PostDetailPage />, // id는 어떻게 가져와? useParams() 사용 - postDetailpage에 있음
      //   // loader는 데이터를 받아오는 시점을 앞당겨줄 뿐이지 빨라지진않아서 느리긴하다.
      //   // 위의 사항을 해결하고싶다면 Await 컴포넌트를 공부해서 쓴다면 된다.
      //   loader: postDetailPageLoader,
      // },
    ],
  },
]);

export default router;
