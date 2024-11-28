import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // Asegúrate de que el backend está corriendo
});

export default api;