import { authKeys } from "./queryKeys";

export const authMutationOptions = {
  signup: () => ({
    mutationKey: authKeys.signup,
    mutationFn: async () => {},
  }),

  login: () => ({
    mutationKey: authKeys.login,
    mutationFn: async () => {
      try {
        console.log("try");
      } catch {
        throw new Error("로그인 실패");
      }
    },
  }),
};
