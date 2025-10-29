// Establish connection to the backend using axios
import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-site-zk15.onrender.com",
});

// Automatically add a token to every request if the user is logged in
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
