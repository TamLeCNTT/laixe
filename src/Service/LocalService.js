import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://123.22.212.135:7782/api/";

class LocalService {
  async getlist() {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/getall");
  }
  async getBymonth(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/month/" + e);
  }

  async getall(token, name) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "HocVienTH?Socmt=" + name, {
      headers: { Authorization: "Bearer " + token },
    });
  }
  async getHanhTrinh(token, name) {
    return await axios.get(
      EMPLOYEE_API_BASE_URL + "HanhTrinh?ten=" + name + "&page=1&limit=50",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  }
  //   "AnhHanhTrinh?ten=94009-20230806-150407&ngaybatdau=2023-9-1&ngayketthuc=2023-10-26%2023:59:59&page=1&limit=20",
  async hanhtrinh(token, name) {
    return await axios.get(
      EMPLOYEE_API_BASE_URL + "XeOnline",

      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  }
  login(account) {
    return axios.post(EMPLOYEE_API_BASE_URL + "Login", account);
  }
  edit(id, cabin) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, cabin);
  }
  delete(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }
}

export default new LocalService();
