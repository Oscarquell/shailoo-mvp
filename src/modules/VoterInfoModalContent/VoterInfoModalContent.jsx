import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../API/api";
import style from "./VoterInfoModalContent.module.css";
import { Button } from "@mui/material";
import {getVotersList} from "../../API/getVoterList";

const VoterInfoModalContent = ({ id, setIsOpened, setVoters }) => {
    const [voter, setVoter] = useState({});
    const [edit, setEdit] = useState(false);
    const [pollingStations, setPollingStations] = useState([]);
    const [newVoter, setNewVoter] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false)

    // === Получение данных избирателя ===
    async function getVoter() {
        try {
            const { data } = await axiosInstance.get(`/voters/${id}`);
            setVoter(data);
            setNewVoter(data);
        } catch (e) {
            console.error("Ошибка при загрузке избирателя:", e);
        }
    }

    // === Получение списка участков ===
    async function getPollingStations() {
        try {
            const { data } = await axiosInstance.get("/polling-stations/statistics");
            setPollingStations(data);
        } catch (e) {
            console.error("Ошибка при загрузке участков:", e);
        }
    }

    // === Отправка обновлённых данных на сервер ===
    async function updateVoter() {
        try {
            // Приведение типов перед отправкой
            const payload = {
                ...newVoter,
                participatedInPreviousElections:
                    newVoter.participatedInPreviousElections === "true"
                        ? true
                        : newVoter.participatedInPreviousElections === "false"
                            ? false
                            : null,
                source: newVoter.source === "new" ? "new" : "old",
                pollingStationNumber: Number(newVoter.pollingStationNumber)
            };

            console.log(payload)

            const {data} = await axiosInstance.put(`/voters/${id}`, payload);

            // setVoter(payload);
            setEdit(false);
            console.log("Избиратель успешно обновлён:", data);
        } catch (e) {
            console.error("Ошибка при обновлении избирателя:", e);
        }
    }

    async function deleteVoter() {
        try {
            const {data} = await axiosInstance.delete(`/voters/${id}`)
            getVoters()
            setIsOpened(false)
        } catch (e) {
            console.log(e)
        }
    }

    async function getVoters() {
        const voters = await getVotersList()
        setVoters(voters)
        setIsOpened(false)
    }

    useEffect(() => {
        getVoter();
    }, [id]);

    useEffect(() => {
        getPollingStations();
    }, []);

    return (
        <div className={style.modalContent}>
            <h2 className={style.title}>{voter?.name}</h2>

            <div className={style.infoCard}>
                <div className={style.infoBlock}>
                    <div>ID:</div>
                    <div>ИНН:</div>
                    <div>Адрес:</div>
                    <div>Номер участка:</div>
                    <div>Агитатор:</div>
                    <div>Участие раньше:</div>
                    <div>Телефон:</div>
                    <div>Избиратель:</div>
                </div>

                <div className={style.infoBlock}>
                    {edit ? (
                        <>
                            <div>{voter?.id}</div>
                            <div>
                                <input
                                    onChange={(e) => setNewVoter({ ...newVoter, pin: e.target.value })}
                                    value={newVoter?.pin || ""}
                                    type="text"
                                />
                            </div>
                            <div>
                                <input
                                    onChange={(e) => setNewVoter({ ...newVoter, address: e.target.value })}
                                    value={newVoter?.address || ""}
                                    type="text"
                                />
                            </div>
                            <div>
                                <select
                                    onChange={(e) =>
                                        setNewVoter({ ...newVoter, pollingStationNumber: e.target.value })
                                    }
                                    value={newVoter?.pollingStationNumber || ""}
                                >
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
                                    onChange={(e) => setNewVoter({ ...newVoter, agitator: e.target.value })}
                                    type="text"
                                    value={newVoter?.agitator || ""}
                                />
                            </div>
                            <div>
                                <select
                                    onChange={(e) =>
                                        setNewVoter({
                                            ...newVoter,
                                            participatedInPreviousElections: e.target.value
                                        })
                                    }
                                    value={
                                        newVoter?.participatedInPreviousElections === true
                                            ? "true"
                                            : newVoter?.participatedInPreviousElections === null
                                                ? "null"
                                                : "false"
                                    }
                                >
                                    <option value="true">Да</option>
                                    <option value="false">Нет</option>
                                    <option value="null">Неизвестно</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    onChange={(e) => setNewVoter({ ...newVoter, phone: e.target.value })}
                                    value={newVoter?.phone || ""}
                                    type="text"
                                />
                            </div>
                            <div>
                                <select
                                    onChange={(e) => setNewVoter({ ...newVoter, source: e.target.value })}
                                    value={newVoter?.source === "new" ? "new" : "old"}
                                >
                                    <option value="new">Новый</option>
                                    <option value="old">Из старой базы</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>{voter?.id}</div>
                            <div>{voter?.pin}</div>
                            <div>{voter?.address}</div>
                            <div>{voter?.pollingStationNumber}</div>
                            <div>{voter?.agitator}</div>
                            <div>
                                {voter?.participatedInPreviousElections
                                    ? "Да"
                                    : voter?.participatedInPreviousElections === null
                                        ? "Неизвестно"
                                        : "Нет"}
                            </div>
                            <div>{voter?.phone}</div>
                            <div>{voter?.source === "new" ? "Новый" : "Из старой базы"}</div>
                        </>
                    )}
                </div>
            </div>

            {edit ? (
                <div className={style.buttons}>
                    <Button
                        variant="contained"
                        className={style.editBtn}
                        onClick={updateVoter}
                    >
                        Готово
                    </Button>
                </div>
            ) : confirmDelete ?
                <div className={style.buttonsConfirmPar}>
                    <p>Вы уверены?</p>
                    <div className={style.buttonsConfirm}>
                        <Button
                            variant="contained"
                            className={style.editBtn}
                            onClick={() => {setConfirmDelete(false)}}
                        >
                            Нет
                        </Button>
                        <Button onClick={deleteVoter} variant="contained" className={style.deleteBtn}>
                            Да
                        </Button>
                    </div>
                </div>
                :
                <div className={style.buttons}>
                    <Button
                        variant="contained"
                        className={style.editBtn}
                        onClick={() => setEdit(true)}
                    >
                        Редактировать
                    </Button>
                    <Button onClick={() => setConfirmDelete(true)} variant="contained" className={style.deleteBtn}>
                        Удалить
                    </Button>
                </div>
            }
        </div>
    );
};

export default VoterInfoModalContent;
