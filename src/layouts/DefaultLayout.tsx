import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import api from "../api/api";
import { User } from "../stores/auth.store";

function DefaultLayout() {
  const [user, setUser] = useState<User>({
    id: "",
    password: "",
    nickname: "",
    avatar: "",
  });

  useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const info = await api.auth.getUserInfo();
      console.log("info", info);

      setUser(info);
      console.log("user", user);
      return info;
    },
    retry: 1,
  });

  return <Outlet />;
}

export default DefaultLayout;
