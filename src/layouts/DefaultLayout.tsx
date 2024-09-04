import { Outlet } from "react-router-dom";

function DefaultLayout() {
  // const { putUser } = useAuthStore();
  // const {isError} = useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: async () => {
  //     const info = await api.auth.getUserInfo();
  //     delete info.success;
  //     putUser(info);
  //     return info;
  //   },
  //   retry: 1,
  // });
  // if(isError) {

  // }
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
