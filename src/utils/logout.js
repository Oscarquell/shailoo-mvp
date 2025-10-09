import axios from "axios";

export const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    const exit = async () => {
        try {
            const response = await axios.post("https://emgek.online/api/auth/logout", {refreshToken})
        } catch (e) {
            console.log(e)
        }
    }
    exit()
};