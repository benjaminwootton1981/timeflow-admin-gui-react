import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../config";

const csrftoken = Cookies.get("csrftoken");
const api = axios.create({
  baseURL: API_URL,
  headers: { "X-CSRFToken": csrftoken },
});

export default api;
