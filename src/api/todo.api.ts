import { AxiosInstance } from "axios";

class Todo {
  #axios;

  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  async getTodos() {
    const path = "/todos";
    const response = await this.#axios.get(path);
    const result = response.data;

    return result;
  }

  async getTodo(id: number) {
    const path = `todos/${id}`;
    const response = await this.#axios.get(path);
    const result = response.data;

    return result;
  }
}

export default Todo;
