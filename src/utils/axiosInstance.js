import axios from "axios";
import { api } from "../config/config";

const axiosInstacne = axios.create({
    baseURL : api,
});

axiosInstacne.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");

    if(token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default axiosInstacne;