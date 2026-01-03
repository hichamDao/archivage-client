import axios from "axios";

const API = axios.create({
    baseURL: "https://archivageapp-production.up.railway.app",
});

export default API;
