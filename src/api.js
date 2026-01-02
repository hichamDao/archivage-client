import axios from "axios";

const API = axios.create({
    baseURL: "https://archivage-doc.up.railway.app/api/",
});

export default API;
