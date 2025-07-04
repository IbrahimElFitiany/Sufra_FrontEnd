import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});

http.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default http;
