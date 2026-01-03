import axios from "axios";

const API = axios.create({
    baseURL: "https://archivageapp-production.up.railway.app/api/",
    withCredentials: true // si tu envoies cookies
});

export default API;
