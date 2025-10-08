import axios from "axios";
import { getToken, setToken } from "./token";
import { updateAccessToken } from "./updateToke";
import {showWarning} from "../utils/alerts";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:8080/api/",
    baseURL: "https://emgek.online/api",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getToken();
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const access_token = await updateAccessToken();
                if (access_token) {
                    setToken(access_token);
                    axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                showWarning('Внимание!', '🔒 Рефреш токен невалиден - перенаправляю на страницу авторизации')
                localStorage.clear();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export { axiosInstance };
