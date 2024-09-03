import axios, { AxiosInstance } from "axios";
import Auth from "./auth.api";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

class API {
  // eslint-disable-next-line no-unused-private-class-members
  #axios: AxiosInstance;
  auth;

  constructor() {
    // 후에 baseUrl이 생긴다면 업데이트 해줄 것
    this.#axios = axios.create({ baseURL: AUTH_URL });
    this.auth = new Auth(axios.create({ baseURL: AUTH_URL }));

    // this.#axios.interceptors.request.use(
    //   async (config) => {
    //     await this.auth.getUserInfo();

    //     return config;
    //   },
    //   (error) => {
    //     return error;
    //   }
    // );
  }
}

const api = new API();

export default api;
