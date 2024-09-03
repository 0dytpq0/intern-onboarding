import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type UserStoreProps = {
  user: User;
  putId: (value: string) => void;
  putPassword: (value: string) => void;
  putNickname: (value: string) => void;
  putAvatar: (value: string) => void;
};

export type User = {
  id: string;
  password: string;
  nickname: string;
  avatar: string;
};

export const useAuthStore = create<UserStoreProps>()(
  immer((set) => ({
    user: {
      id: "",
      password: "",
      avatar: "/",
      nickname: "",
    },
    putId: (newId) => {
      set((prevUser) => {
        prevUser.user.id = newId;
      });
    },

    putPassword: (newPassword) => {
      set((prevUser) => {
        prevUser.user.password = newPassword;
      });
    },
    putNickname: (newNick) => {
      set((prevUser) => {
        prevUser.user.nickname = newNick;
      });
    },
    putAvatar: (newURL) => {
      set((prevUser) => {
        prevUser.user.avatar = newURL;
      });
    },
  }))
);
