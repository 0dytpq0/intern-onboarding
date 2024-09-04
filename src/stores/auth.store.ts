import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type UserStoreProps = {
  user: User;
  putId: (value: string) => void;
  putPassword: (value: string) => void;
  putNickname: (value: string) => void;
  putAvatar: (value: string) => void;
  putUser: (value: User) => void;
};

export type User = {
  id: string;
  password: string;
  nickname: string;
  avatar: string | null;
};

export const useAuthStore = create<UserStoreProps>()(
  immer((set) => ({
    user: {
      id: "",
      password: "",
      avatar: null,
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
    putUser: (newUser) => {
      set((prevUser) => {
        prevUser.user = newUser;
      });
    },
  }))
);
