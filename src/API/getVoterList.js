import {axiosInstance} from "./api";

export const getVotersList = async (page) => {
    const voters = await axiosInstance.get(`/voters?page=${page}`);
    const response = await voters;
    return(response.data);
}