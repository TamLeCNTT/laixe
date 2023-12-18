import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/cohuu";

class CoHuuService {
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
  editbyid(id, cohuu) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, cohuu);
  }
  edit(cohuu) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/", cohuu);
  }
  delete(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new CoHuuService();
