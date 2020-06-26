import axios from "axios";
import { API_URL } from "../config";
import Cookies from "js-cookie";
// export const baseUrl = process.env.REACT_APP_API + "/api/v1";
export const domainUrl = process.env.REACT_APP_API;

// Axios settings
const csrftoken = Cookies.get("csrftoken");
export const ax = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": csrftoken,
  },
});
