import React, {useEffect, useState} from "react";
import "./pollingInfoPage.css";
import {axiosInstance} from "../../API/api";
import {showError} from "../../utils/alerts";

const pollingData = [
    { id: 1, name: "Избирательный участок №1125", address: "ул. Манаса, 45", totalVoters: 520, agitator: "Аскар Куленбеков" },
    { id: 2, name: "Избирательный участок №1126", address: "ул. Абая, 17", totalVoters: 430, agitator: "Клара Токтосартова" },
    { id: 3, name: "Избирательный участок №1127", address: "ул. Московская, 88", totalVoters: 610, agitator: "Диана Русланова" },
    { id: 4, name: "Избирательный участок №1128", address: "ул. Тоголока Молдо, 22", totalVoters: 380, agitator: "Адель Куленбеков" },
];

const PollingInfoPage = () => {

    const [pollingStations, setPollingStations] = useState([]);

    const getPollingStations = async () => {
        try {
            const response = await axiosInstance.get('/polling-stations')
            const data = response.data;
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
