import axios from "axios";
import configs from "../configs/configs.cfg";

const APICall = axios.create({});

APICall.interceptors.request.use(
    async (config) => {
        config.baseURL = configs.originBackend;
        return config;
    },
    (error) => Promise.reject(error)
);

APICall.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error);
    }
);

export default APICall;
