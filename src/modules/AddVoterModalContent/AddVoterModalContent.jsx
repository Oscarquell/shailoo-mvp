import React, { useEffect, useState } from "react";
import style from "./AddVoterModalContent.module.css";
import { axiosInstance } from "../../API/api";
import { Button } from "@mui/material";

const AddVoterModalContent = () => {
    const [pollingStations, setPollingStations] = useState([]);
    const [newVoterObj, setNewVoterObj] = useState({});

    // === Получение участков ===
    async function getPollingStations() {
        try {
            const { data } = await axiosInstance.get("/polling-stations/statistics");
            setPollingStations(data);
        } catch (e) {
            console.error("Ошибка при загрузке участков:", e);
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
            const { data } = await axiosInstance.post("/voters", newVoterObj);
            console.log("✅ Избиратель успешно добавлен:", data);
        } catch (e) {
            console.error("Ошибка при добавлении избирателя:", e);
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
                    <div className={style.infoBlock}>
                        <div>ИНН:</div>
                        <div>Адрес:</div>
                        <div>Номер участка:</div>
                        <div>Агитатор:</div>
                        <div>Участие раньше:</div>
                        <div>Телефон:</div>
                        <div>Источник:</div>
                    </div>

                    <div className={style.infoBlock}>
                        <div>
                            <input
                                type="text"
                                onChange={(e) => handleInputChange("pin", e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                onChange={(e) => handleInputChange("address", e.target.value)}
                            />
                        </div>
                        <div>
                            <select
                                onChange={(e) =>
                                    handleInputChange("pollingStationNumber", e.target.value)
                                }
                            >
                                <option value="">Выберите участок</option>
                                {pollingStations.map((item) => (
                                    <option
                                        key={item.pollingStationNumber}
                                        value={item.pollingStationNumber}
                                    >
                                        {item.pollingStationNumber}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                onChange={(e) => handleInputChange("agitator", e.target.value)}
                            />
                        </div>
                        <div>
                            <select
                                onChange={(e) =>
                                    handleInputChange("participatedInPreviousElections", e.target.value)
                                }
                            >
                                <option value="">Выберите статус</option>
                                <option value="null">Неизвестно</option>
                                <option value="true">Да</option>
                                <option value="false">Нет</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                        </div>
                        <div>
                            <select
                                onChange={(e) => handleInputChange("source", e.target.value)}
                            >
                                <option value="">Выберите источник</option>
                                <option value="new">Новый</option>
                                <option value="old">Из старой базы</option>
                            </select>
                        </div>
                    </div>
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
