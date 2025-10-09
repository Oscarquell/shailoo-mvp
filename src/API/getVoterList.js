import {axiosInstance} from "./api";

export const getVotersList = async (page, size) => {
    const voters = await axiosInstance.get(`/voters?page=${page}&size=${size}`);
    const response = await voters;
    return(response.data);
}