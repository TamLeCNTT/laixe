import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/user";

class UserService {
  async getlist() {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/getall");
  }

  async getByid(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/" + e);
  }
  add(user) {
    return axios.post(EMPLOYEE_API_BASE_URL, user);
  }
  login(user) {
    return axios.post(EMPLOYEE_API_BASE_URL + "/login", user);
  }
  edit(id, user) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, user);
  }
  delete(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new UserService();
