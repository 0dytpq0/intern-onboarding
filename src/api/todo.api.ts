import * as Sentry from "@sentry/react";
import { AxiosInstance } from "axios";

class Todo {
  #axios;

  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  async getTodos() {
    try {
      const path = "/todos";
      const response = await this.#axios.get(path);
      const result = response.data;

      return result;
    } catch (error) {
      Sentry.captureException(error);
      throw new Error("Todos 호출 실패");
    }
  }

  async getTodo(id: number) {
    try {
      const path = `todos/${id}`;
      const response = await this.#axios.get(path);
      const result = response.data;

      return result;
    } catch (error) {
      Sentry.captureException(error);
      throw new Error("Todo 호출 실패");
    }
  }
}

export default Todo;
