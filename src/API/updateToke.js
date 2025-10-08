import axios from "axios";
import { setToken } from "./token";

export const updateAccessToken = async () => {
    const refresh = localStorage.getItem("refreshToken");

    if (!refresh) {
        console.warn("⚠️ Refresh token missing — redirecting to login");
        localStorage.clear();
        window.location.href = "/login";
        return;
    }

    console.log("🔁 Trying to refresh with token:", refresh);

    try {
        const response = await axios.post(
            "http://localhost:8080/api/refresh",
            { refresh_token: refresh }, // ✅ ключ, который бэк ожидает
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("✅ Token refreshed successfully:", response.data);

        const access_token = response.data.access || response.data.accessToken;
        if (!access_token) throw new Error("No access token in response");

        setToken(access_token);
        return access_token;
    } catch (error) {
        console.error("❌ Failed to refresh token:", error.response?.data || error.message);

        // === Очистка токенов и редирект ===
        localStorage.clear();
        window.location.href = "/login";

        throw error;
    }
};
