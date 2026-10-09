import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const session = localStorage.getItem("grid_session");
  if (session) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${session}`;
    config.headers["x-session-id"] = session;
  }
  return config;
});

export default api;