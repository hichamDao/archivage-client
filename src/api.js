import axios from "axios";

const API = axios.create({
    baseURL: "https://archivageapp-production.up.railway.app/api/auth",
});

export const registerUser = (data) => API.post("/register", data);

