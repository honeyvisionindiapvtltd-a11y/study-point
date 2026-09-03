import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const api = axios.create({ baseURL });
api.interceptors.request.use(config => {
  const token = localStorage.getItem("study_point_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem("study_point_token");
    window.dispatchEvent(new CustomEvent("study-point-auth-expired", { detail: { message: "Your session has expired. Please log in again." } }));
  }
  return Promise.reject(error);
});
