import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import EditIcon from "../assets/edit.svg?react";

function UserPage() {
  const { data: user } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => api.auth.getUserInfo(),
  });
  // src="../../public/svgIcons/warning.svg"
  // Edit 기능
  console.log("user", user);
  return (
    <div className="relative mx-auto overflow-hidden bg-white rounded-lg shadow-md w-72">
      <div className="flex items-center p-6">
        <img
          className="object-cover w-16 h-16 rounded-full"
          src="https://via.placeholder.com/150"
          alt="User avatar"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {user ? user.nickname : ""}
          </h2>
          <p className="text-sm text-gray-600">{user ? user.id : ""}</p>
        </div>
      </div>
      <EditIcon className="absolute top-3 right-3" />
    </div>
  );
}

export default UserPage;
