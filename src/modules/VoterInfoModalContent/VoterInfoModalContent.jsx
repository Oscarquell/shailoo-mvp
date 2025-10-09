import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../API/api";
import style from "./VoterInfoModalContent.module.css";
import { Button } from "@mui/material";
import {getVotersList} from "../../API/getVoterList";
import {useNavigate} from "react-router-dom";
import {showError, showSuccess} from "../../utils/alerts";

const VoterInfoModalContent = ({getVoters, id, setIsOpened, setVoters }) => {
    const [voter, setVoter] = useState({});
    const [edit, setEdit] = useState(false);
    const [pollingStations, setPollingStations] = useState([]);
    const [newVoter, setNewVoter] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false)
    const navigate = useNavigate()


    // === Получение данных избирателя ===
    async function getVoter() {
        try {
            const { data } = await axiosInstance.get(`/voters/${id}`);
            setVoter(data);
            setNewVoter({...data, pollingStationId: data.pollingStation.poolingStationId});
        } catch (e) {
            console.error(e);

            // navigate("/login")
        }
    }

    // === Получение списка участков ===
    async function getPollingStations() {
        try {
            const { data } = await axiosInstance.get("/polling-stations");
            setPollingStations(data);
        } catch (e) {
            console.error(e);
            showError("Ошибка при получении Избирательных участков!")
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


            const {data} = await axiosInstance.put(`/voters/${id}`, payload);

            setVoter(data);
            getVoters()
            setEdit(false);
            showSuccess("Избиратель успешно обновлен!")
        } catch (e) {
            console.log(e)
            try {
                // Берём первый ключ из объекта деталей ошибки
                const errorObj = e.response?.data.details || {};
                const firstKey = Object.keys(errorObj)[0];
                const firstValue = errorObj[firstKey];
                showError( firstValue || "Неизвестная ошибка");
            } catch {
                showError( "Произошла ошибка при изменении избирателя");
            }
        }
    }

    async function deleteVoter() {
        try {
            await axiosInstance.delete(`/voters/${id}`)
            getVoters()
            showSuccess("Избиратель успешно удвлен!")
            setIsOpened(false)
        } catch (e) {
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
        getVoter();
    }, [id]);

    useEffect(() => {
        getPollingStations();
    }, []);

    return (
        <div className={style.modalContent}>
            {edit ?
                <div style={{marginBottom: 20}}>
                    <input onChange={(e) => setNewVoter({ ...newVoter, name: e.target.value })} value={newVoter?.name} className={style.TitleInput} type="text"/>
                </div>
                :
                <h2 className={style.title}>{voter?.name}</h2>
            }

            <div className={style.infoCard}>
                <div className={style.infoBlock}>
                    <div>ID:</div>
                    <div>ИНН:</div>
                    <div>Адрес:</div>
                    <div>Номер&nbsp;участка:</div>
                    <div>Агитатор:</div>
                    <div>Участие&nbsp;раньше:</div>
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
                                        setNewVoter({ ...newVoter, pollingStationId: Number(e.target.value) })
                                    }
                                    value={newVoter?.pollingStationId || ""}
                                >
                                    {pollingStations.map((item) => (
                                        <option
                                            key={item.poolingStationId}
                                            value={item.poolingStationId}
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
                            <div>{voter?.pollingStation?.pollingStationNumber}</div>
                            <div>{voter?.agitator}</div>
                            <div>
                                {voter?.participatedInPreviousElections
                                    ? "Да"
                                    : voter?.participatedInPreviousElections === null
                                        ? "Неизвестно"
                                        : "Нет"}
                            </div>
                            <div><a style={{color: "white"}} href={`tel:${voter?.phone}`}>{voter?.phone}</a></div>
                            <div>{voter?.source === "new" ? "Новый" : "Из старой базы"}</div>
                        </>
                    )}
                </div>
            </div>

            {edit ? (
                <div className={style.buttons}>
                    <Button onClick={() => setEdit(false)} variant="contained" className={style.deleteBtn}>
                        Отмена
                    </Button>
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
