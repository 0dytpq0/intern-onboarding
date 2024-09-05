import axios, { AxiosInstance } from "axios";
import Auth from "./auth.api";
import Todo from "./todo.api";

const AUTH_URL = "https://moneyfulpublicpolicy.co.kr/";
const BASE_URL = "https://jsonplaceholder.typicode.com/";
class API {
  // eslint-disable-next-line no-unused-private-class-members
  #axios: AxiosInstance;
  auth;
  todo;

  constructor() {
    this.#axios = axios.create({ baseURL: BASE_URL });

    this.auth = new Auth(axios.create({ baseURL: AUTH_URL }));
    this.todo = new Todo(this.#axios);
  }
}

const api = new API();
export default api;
