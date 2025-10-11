import {axiosInstance} from "./api";

export async function getAgitatorsList() {
        const { data } = await axiosInstance.get("/agitators");
        return data.data;
}