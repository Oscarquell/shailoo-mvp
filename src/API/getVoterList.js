import {axiosInstance} from "./api";

export const getVotersList = async (page = 0, size = 20) => {
    const voters = await axiosInstance.get(`/voters?page=${page}&size=${size}`);
    const response = await voters;
    return(response.data);
}