import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/student";

class StudentService {
  async getlist() {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/getall");
  }

  async getByid(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/" + e);
  }
  async getlistgreaterday(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/greaterday/" + e);
  }
  async getlistday(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/day/" + e);
  }
  async add(cohuu) {
    return await axios.post(EMPLOYEE_API_BASE_URL, cohuu);
  }
  async addmany(cohuu) {
    return await axios.post(EMPLOYEE_API_BASE_URL + "/createmany", cohuu);
  }
  editbyid(id, cohuu) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, cohuu);
  }
  delete(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new StudentService();
