import React, { useEffect, useState } from "react";
import style from "./AddVoterModalContent.module.css";
import { axiosInstance } from "../../API/api";
import { Button } from "@mui/material";
import {showError, showSuccess} from "../../utils/alerts";

const AddVoterModalContent = ({setIsOpened}) => {
    const [pollingStations, setPollingStations] = useState([]);
    const [newVoterObj, setNewVoterObj] = useState({source: "new"});

// === Получение участков ===
    async function getPollingStations() {
        try {
            const { data } = await axiosInstance.get("/polling-stations/statistics");
            setPollingStations(data);
        } catch (e) {


            console.error("Ошибка при загрузке участков:", e);
            // const errorObj = e.response?.data || {};
            // const firstKey = Object.keys(errorObj)[0];
            // const firstValue = errorObj[firstKey];
        }
    }


    const handleInputChange = (field, value) => {
        let parsedValue = value;

        if (field === "pollingStationNumber") {
            parsedValue = Number(value); // делаем числом
        } else if (field === "participatedInPreviousElections") {
            if (value === "true") parsedValue = true;
            else if (value === "false") parsedValue = false;
            else parsedValue = null;
        }

        setNewVoterObj((prev) => ({
            ...prev,
            [field]: parsedValue,
        }));
    };

    // === Отправка нового избирателя ===
    async function newVoter() {
        try {
            await axiosInstance.post("/voters", newVoterObj);
            showSuccess("✅ Избиратель успешно добавлен:");
            setIsOpened(false);
        } catch (e) {
            console.log(e)
            try {
                // Берём первый ключ из объекта деталей ошибки
                const errorObj = e.response?.data.details || {};
                const firstKey = Object.keys(errorObj)[0];
                const firstValue = errorObj[firstKey];

                showError( firstValue || "Неизвестная ошибка");
            } catch {
                showError( "Произошла ошибка при добавлении избирателя");
            }
        }
    }

    useEffect(() => {
        getPollingStations();
    }, []);

    useEffect(() => {
        console.log("Текущий объект:", newVoterObj);
    }, [newVoterObj]);

    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault()}}>
                <div className={style.title}>
                    <span>ФИО:</span>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                </div>

                <div className={style.parent}>
                    <label>ИНН:</label>
                    <input type="text" onChange={(e) => handleInputChange("pin", e.target.value)} />

                    <label>Адрес:</label>
                    <input type="text" onChange={(e) => handleInputChange("address", e.target.value)} />

                    <label>Номер участка:</label>
                    <select onChange={(e) => handleInputChange("pollingStationNumber", e.target.value)}>
                        <option value="">Выберите участок</option>
                        {pollingStations.sort((a, b) => a.pollingStationNumber - b.pollingStationNumber).map((item) => (
                            <option key={item.pollingStationNumber} value={item.pollingStationNumber}>
                                {item.pollingStationNumber}
                            </option>
                        ))}
                    </select>

                    <label>Агитатор:</label>
                    <input type="text" onChange={(e) => handleInputChange("agitator", e.target.value)} />

                    <label>Участие раньше:</label>
                    <select onChange={(e) => handleInputChange("participatedInPreviousElections", e.target.value)}>
                        <option value="">Выберите статус</option>
                        <option value="null">Неизвестно</option>
                        <option value="true">Да</option>
                        <option value="false">Нет</option>
                    </select>

                    <label>Телефон:</label>
                    <input type="text" onChange={(e) => handleInputChange("phone", e.target.value)} />

                    <label>Источник:</label>
                    <select
                        value={newVoterObj.source || ""}
                        onChange={(e) => handleInputChange("source", e.target.value)}
                    >
                        <option value="">Выберите источник</option>
                        <option value="new">Новый</option>
                        <option value="old">Из старой базы</option>
                    </select>

                </div>


                <div className={style.buttons}>
                    <Button
                        sx={{ width: "100%" }}
                        variant="contained"
                        className={style.editBtn}
                        onClick={newVoter}
                    >
                        Готово
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddVoterModalContent;
