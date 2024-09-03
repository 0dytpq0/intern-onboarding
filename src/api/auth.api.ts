import { AxiosInstance } from "axios";
import { User } from "../stores/auth.store";

class Auth {
  #axios;

  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }
  //   {
  //     "id": "유저 아이디",
  // 		"password": "유저 비밀번호",
  // 		"nickname": "유저 닉네임"
  // }
  async signUp(data: Omit<User, "avatar">) {
    const path = "/register";
    const response = await this.#axios.post(path, data);
    const result = response;

    return result;
  }
  // {
  //   "id":"유저 아이디",
  //   "password": "유저 비밀번호"
  // }
  async signIn(data: Pick<User, "id" | "password">) {
    const path = "/login";
    const response = await this.#axios.post(path, data);
    const result = response.data;
    return result;
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
  async updateProfile(data: Pick<User, "avatar" | "nickname">) {
    const path = "/profile";
    const response = await this.#axios.patch(path, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const result = response.data;
    console.log("update result", result);
    return result;
  }

  async setAccessToken(token: string) {
    this.#axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export default Auth;
