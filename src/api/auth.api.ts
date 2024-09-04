import * as Sentry from "@sentry/react";
import { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { User } from "../stores/auth.store";

class Auth {
  #axios;

  constructor(axios: AxiosInstance) {
    this.#axios = axios;
    this.#axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get("accessToken");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  //   {
  //     "id": "유저 아이디",
  // 		"password": "유저 비밀번호",
  // 		"nickname": "유저 닉네임"
  // }
  async signUp(data: Omit<User, "avatar">) {
    const path = "/register";
    const response = await this.#axios.post(path, data);
    const result = response.data;

    return result;
  }
  // {
  //   "id":"유저 아이디",
  //   "password": "유저 비밀번호"
  // }
  async logIn(data: Pick<User, "id" | "password">) {
    try {
      const path = "/login";
      const response = await this.#axios.post(path, data);
      const result = response.data;
      return result;
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
      throw new Error("로그인 실패");
    }
  }

  async getUserInfo() {
    const path = "/user";

    const response = await this.#axios.get(path);
    const result = response.data;
    return result;
  }

  // {
  //   "avatar": [이미지파일],
  //   "nickname": "변경할 닉네임"
  // }
  async updateProfile(data: { avatar: File; nickname: string }) {
    const path = "/profile";
    const response = await this.#axios.patch(path, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const result = response.data;
    return result;
  }

  async setAccessToken(token: string) {
    this.#axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    Cookies.set("accessToken", token, { expires: 1 / 96 });
  }
}

export default Auth;
