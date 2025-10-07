import {axiosInstance} from "./api";

export const getVotersList = async () => {
    const voters = await axiosInstance.get('/voters');
    const response = await voters;
    return(response.data);
}