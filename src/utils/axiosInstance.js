import axios from "axios";
import { api } from "../config/config";

const axiosInstance = axios.create({
    baseURL : api,
});

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }else{
        delete config.headers.Authorization;
    }
    return config;
},
(error) => Promise.reject(error)
);

export default axiosInstance;