import axios from "axios";

const EMPLOYEE_API_BASE_URL = "https://api.node.truonglaihungthinh.com/cabin";

class CabinService {
  async getlist() {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/getall");
  }
  async getBymonth(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/month/" + e);
  }

  async getByid(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/" + e);
  }
  add(cabin) {
    return axios.post(EMPLOYEE_API_BASE_URL, cabin);
  }
  edit(id, cabin) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, cabin);
  }
  delete(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new CabinService();
