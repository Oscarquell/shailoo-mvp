import React, {useEffect, useState} from "react";
import "./pollingInfoPage.css";
import {axiosInstance} from "../../API/api";
import {showError} from "../../utils/alerts";

const PollingInfoPage = () => {

    const [pollingStations, setPollingStations] = useState([]);

    const getPollingStations = async () => {
        try {
            const response = await axiosInstance.get('/polling-stations')
            const data = response.data.data;
            setPollingStations(data)
        } catch (e) {
            showError('Ошибка', 'Что-то пошло не так, обратитесь к администратору.')
        }
    }

    useEffect(() => {
        getPollingStations()
    }, [])

    return (
        <div className="polling-page">
            <h2 className="polling-title">Информация по избирательным участкам</h2>

            <div className="polling-table">
                <div className="polling-header">
                    <div>№</div>
                    <div>Название участка</div>
                    <div>Адрес</div>
                    <div>Кол-во избирателей</div>
                </div>

                {pollingStations.map((item, index) => (
                    <div key={item.poolingStationId} className="polling-row">
                        <div>{index + 1}</div>
                        <div>{item.name}</div>
                        <div>{item.address}</div>
                        <div>{item.pollingStationNumber}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PollingInfoPage;
