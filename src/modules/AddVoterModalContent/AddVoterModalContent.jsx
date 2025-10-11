import React, { useEffect, useState } from "react";
import style from "./AddVoterModalContent.module.css";
import { axiosInstance } from "../../API/api";
import { Button } from "@mui/material";
import {showError, showSuccess} from "../../utils/alerts";

const AddVoterModalContent = ({getVoters, setIsOpened}) => {
    const [pollingStations, setPollingStations] = useState([]);
    const [agitators, setAgitators] = useState([]);
    const [newVoterObj, setNewVoterObj] = useState({source: "NEW"});
    const [error, setError] = useState({})

    console.log(newVoterObj)
// === Получение участков ===
    async function getPollingStations() {
        setError({})
        try {
            const { data } = await axiosInstance.get("/polling-stations");
            setPollingStations(data.data);
            console.log(data)
        } catch (e) {
            setError(e.response.data.details);
            console.error("Ошибка при загрузке участков:", e);
            showError("Ошибка при получении Избирательных участков!")
        }
    }

    // === Получение агитаторов ===
    async function getAgitators() {
        setError({})
        try {
            const { data } = await axiosInstance.get("/agitators");
            setAgitators(data.data);
        } catch (e) {
            setError(e.response.data.details);
            console.error("Ошибка при загрузке участков:", e);
            showError("Ошибка при получении Избирательных участков!")
        }
    }

    const handleInputChange = (field, value) => {
        let parsedValue = value;

        if (field === "pollingStationId") {
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
            showSuccess("Избиратель успешно добавлен!");
            getVoters()
            setIsOpened(false);
        } catch (e) {
            console.error(e)
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
        getAgitators()
    }, []);


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
                    <select onChange={(e) => handleInputChange("pollingStationId", e.target.value)}>
                        <option value="">Выберите участок</option>
                        {pollingStations.map((item) => (
                            <option key={item.poolingStationId} value={item.poolingStationId}>
                                {/*{item.name}*/}
                                {item.pollingStationNumber}
                            </option>
                        ))}
                    </select>


                    <label>Агитатор:</label>
                    <select onChange={(e) => handleInputChange("agitatorId", e.target.value)}>
                        <option value="">Выберите агитатора:</option>
                        {agitators.map((item) => (
                            <option key={item.agitatorId} value={item.agitatorId}>
                                {/*{item.name}*/}
                                {item.fullName}
                            </option>
                        ))}
                    </select>


                    {/*<label>Агитатор:</label>*/}
                    {/*<input type="text" onChange={(e) => handleInputChange("agitator", e.target.value)} />*/}

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
                        <option value="NEW">Новый</option>
                        <option value="OLD">Из старой базы</option>
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
