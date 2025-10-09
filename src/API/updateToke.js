import axios from "axios";
import { setToken } from "./token";
import {redirectToLogin} from "./redirectToLogin";

export const updateAccessToken = async () => {
    const refresh = localStorage.getItem("refreshToken");

    if (!refresh) {
        localStorage.clear();
        redirectToLogin()
        return;
    }
    try {
        const response = await axios.post(
            "https://emgek.online/api/refresh",
            { refresh_token: refresh },
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        const access_token = response.data.access || response.data.accessToken;
        if (!access_token) throw new Error("No access token in response");

        setToken(access_token);
        return access_token;
    } catch (error) {
        console.error("❌ Failed to refresh token:", error.response?.data || error.message);
        localStorage.clear();
        window.location.href = "/login";
        throw error;
    }
};
