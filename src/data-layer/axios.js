import axios from "axios";
import {API_URL} from "../config";
// export const baseUrl = process.env.REACT_APP_API + "/api/v1";
export const domainUrl = process.env.REACT_APP_API;

// Axios settings
export const ax = axios.create({
    baseURL: API_URL,
    // baseURL: 'http://192.168.1.81:8000/',
    headers: {
        "Content-Type": "application/json",
    },
});
