import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/session";

class StudentService {
  async getlist() {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/getall");
  }
  async getbyStartAndEnd(bd, kt) {
    return await axios.get(
      EMPLOYEE_API_BASE_URL + "/getbyStartAndEnd/" + bd + "/" + kt
    );
  }

  async getByid(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/code/" + e);
  }
  async getBydate(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/date/" + e);
  }
  async getBycourse(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/course/" + e);
  }
  async getlistgreaterday(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/greaterday/" + e);
  }
  async getlistday(e) {
    return await axios.get(EMPLOYEE_API_BASE_URL + "/day/" + e);
  }
  async add(session) {
    return await axios.post(EMPLOYEE_API_BASE_URL, session);
  }
  async addmany(session) {
    return await axios.post(EMPLOYEE_API_BASE_URL + "/createmany", session);
  }
  editbyid(id, session) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, session);
  }
  delete(id) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);
  }
  deletemanyid(listid) {
    return axios.post(EMPLOYEE_API_BASE_URL + "/delete", listid);
  }
}

export default new StudentService();
