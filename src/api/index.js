import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");
const api = axios.create({
  baseURL: API_URL,
  headers: { "X-CSRFToken": csrftoken },
});

export default api;
