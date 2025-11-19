// Establish connection to the backend using axios
import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-site-backend-2xdt.onrender.com",
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Automatically add a token to every request if the user is logged in
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
