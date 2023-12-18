import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/thuchi";

class ThuchiService {
  async getlist() {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/getall");
  }
  getBymonth(e) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/month/" + e);
  }
  getById(e) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + e);
  }
  add(thuchi) {
    return axios.post(EMPLOYEE_API_BASE_URL, thuchi);
  }
  editbyid(id, thuchi) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, thuchi);
  }
  delete(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new ThuchiService();
