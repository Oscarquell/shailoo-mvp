import { axiosInstance } from "./api";

export const getVotersList = async (page = 0, size = 20, filters = {}) => {
    const params = new URLSearchParams();

    // базовые параметры
    params.append("page", page);
    params.append("size", size);

    // добавляем только те фильтры, которые указаны
    if (filters.address) params.append("address", filters.address);
    if (filters.agitatorName) params.append("agitatorName", filters.agitatorName);
    if (filters.fullName) params.append("fullName", filters.fullName);
    if (filters.phoneNumber) params.append("phoneNumber", filters.phoneNumber);
    if (filters.pin) params.append("pin", filters.pin);
    if (filters.pollingStationNumber)
        params.append("pollingStationNumber", Number(filters.pollingStationNumber));

    const response = await axiosInstance.get(`/voters?${params.toString()}`);
    return response.data.data;
};
