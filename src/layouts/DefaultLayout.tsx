import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function DefaultLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (location.pathname === "/user" && token === undefined) {
      navigate("/login");
    }
  }, [navigate, location]);
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
