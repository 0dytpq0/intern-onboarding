import axios, { AxiosInstance } from "axios";
import Auth from "./auth.api";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

class API {
  // eslint-disable-next-line no-unused-private-class-members
  #axios: AxiosInstance;
  auth;

  constructor() {
    this.#axios = axios.create({ baseURL: AUTH_URL });

    this.auth = new Auth(axios.create({ baseURL: AUTH_URL }));
  }
}

const api = new API();
export default api;
