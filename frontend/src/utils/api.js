import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.defaults.withCredentials = true;
export { api };
