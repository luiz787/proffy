import axios from "axios";

const api = axios.create({
  baseURL: "http://yu-pw8.anonymous.mobile.exp.direct:3333",
});
export default api;
