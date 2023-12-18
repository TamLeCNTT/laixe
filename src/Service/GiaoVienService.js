import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/giaovien";

class GiaoVienService {
  async getlist() {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/getall");
  }

  async getByid(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/" + e);
  }
  add(giaovien) {
    return axios.post(EMPLOYEE_API_BASE_URL, giaovien);
  }
  edit(id, giaovien) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, giaovien);
  }
  delete(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new GiaoVienService();
