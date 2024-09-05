import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import MESSAGE from "../constants/message";
import { useModal } from "../contexts/modal.context";
import { User, useAuthStore } from "../stores/auth.store";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const modal = useModal();
  const { putUser } = useAuthStore();

  const { mutate: login } = useMutation({
    mutationFn: (data: Pick<User, "id" | "password">) => api.auth.logIn(data),
    onSuccess: async (data: User) => {
      await api.auth.setAccessToken(data.accessToken!);
      delete data.accessToken;

      putUser(data);

      queryClient.invalidateQueries({ queryKey: ["userInfo"] });

      navigate("/");
    },
    onError: () => {
      modal.open({ title: MESSAGE.ERROR_MESSAGE.login });
    },
  });

  const { mutate: signup } = useMutation({
    mutationFn: (userInfo: Omit<User, "avatar">) => api.auth.signUp(userInfo),
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      modal.open({ title: MESSAGE.ERROR_MESSAGE.signup });
    },
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: { avatar: File; nickname: string }) =>
      api.auth.updateProfile(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userInfo"] }),
    onError: () => {
      modal.open({ title: "유저 정보 수정 실패" });
    },
  });
  return {
    login,
    signup,
    updateProfile,
  };
};
