import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../API/api";
import style from "./VoterInfoModalContent.module.css";
import { Button } from "@mui/material";
import { showError, showSuccess } from "../../utils/alerts";
import {getAgitatorsList} from "../../API/getAgitatorsList";

const VoterInfoModalContent = ({ getVoters, id, setIsOpened }) => {
    const [voter, setVoter] = useState({});
    const [newVoter, setNewVoter] = useState({});
    const [pollingStations, setPollingStations] = useState([]);
    const [agitators, setAgitators] = useState([]);
    const [edit, setEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    // === Получение данных избирателя ===
    async function getVoter() {
        try {
            const { data } = await axiosInstance.get(`/voters/${id}`);
            console.log(data);
            setVoter(data.data);
            setNewVoter({
                ...data.data,
                pollingStationId: data.data.pollingStation?.poolingStationId || data.data.pollingStation?.pollingStationId || null,
                agitatorId: data.data.agitator?.agitatorId || null,
            });
        } catch (e) {
            console.error(e);
        }
    }

    // === Получение списка участков ===
    async function getPollingStations() {
        try {
            const { data } = await axiosInstance.get("/polling-stations");
            setPollingStations(data.data);
        } catch (e) {
            showError("Ошибка при получении Избирательных участков!");
        }
    }

    async function getAgitators() {
        try {
            const agitators_data = await getAgitatorsList()
            setAgitators(agitators_data);
        } catch (e) {

        }
    }

    // === Обновление данных избирателя ===
    async function updateVoter() {
        try {
            const payload = {
                ...newVoter,
                participatedInPreviousElections:
                    newVoter.participatedInPreviousElections === "true"
                        ? true
                        : newVoter.participatedInPreviousElections === "false"
                            ? false
                            : null,
                source: newVoter.source === "NEW" ? "NEW" : "OLD",
                pollingStationNumber: Number(newVoter.pollingStationNumber),
            };
            const {data} = await axiosInstance.put(`/voters/${id}`, payload);
            setVoter(data.data);
            getVoters();
            setEdit(false);
            showSuccess("Избиратель успешно обновлен!");
        } catch (e) {
            console.log(e);
            try {
                const errorObj = e.response?.data.details || {};
                const firstKey = Object.keys(errorObj)[0];
                const firstValue = errorObj[firstKey];
                showError(firstValue || "Неизвестная ошибка");
            } catch {
                showError("Произошла ошибка при изменении избирателя");
            }
        }
    }

    // === Удаление избирателя ===
    async function deleteVoter() {
        try {
            await axiosInstance.delete(`/voters/${id}`);
            getVoters();
            showSuccess("Избиратель успешно удален!");
            setIsOpened(false);
        } catch (e) {
            try {
                const errorObj = e.response?.data.details || {};
                const firstKey = Object.keys(errorObj)[0];
                const firstValue = errorObj[firstKey];
                showError(firstValue || "Неизвестная ошибка");
            } catch {
                showError("Произошла ошибка при удалении избирателя");
            }
        }
    }

    useEffect(() => {
        getVoter();
    }, [id]);

    useEffect(() => {
        getPollingStations();
        getAgitators()
    }, []);

    return (
        <div className={style.modalContent}>
            {edit ? (
                <div style={{ marginBottom: 20 }}>
                    <input
                        onChange={(e) => setNewVoter({ ...newVoter, name: e.target.value })}
                        value={newVoter?.name || ""}
                        className={style.TitleInput}
                        type="text"
                    />
                </div>
            ) : (
                <h2 className={style.title}>{voter?.name}</h2>
            )}

            <div className={style.infoCard}>
                {/*<div className={style.infoBlock}>*/}
                {/*    <div>ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{voter?.id ?? "—"}</div>*/}
                {/*    <div>ИНН:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{voter?.pin ?? "—"}</div>*/}
                {/*    <div>Адрес:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{voter?.address ?? "—"}</div>*/}
                {/*    <div>Номер&nbsp;участка:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{voter?.pollingStation?.pollingStationNumber ?? "—"}</div>*/}
                {/*    <div>Агитатор:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{voter?.agitator ? `${voter.agitator.fullName} ` : "Не указан"}</div>*/}
                {/*    <div>Участие&nbsp;раньше:&nbsp;&nbsp;&nbsp;{voter?.participatedInPreviousElections ? "Да" : voter?.participatedInPreviousElections === null ? "Неизвестно" : "Нет"}</div>*/}
                {/*    <div>Телефон:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{voter?.phone ? <a style={{ color: "white" }} href={`tel:${voter.phone}`}>{voter.phone}</a>: "—"}</div>*/}
                {/*    <div>Избиратель:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{voter?.source === "new" ? "Новый" : "Из старой базы"}</div>*/}
                {/*</div>*/}
                <div className={style.infoBlock}>
                    <div>
                        <span>ID:</span>
                    </div>
                    <div>
                        <span>ИНН:</span>
                    </div>
                    <div>
                        <span>Адрес:</span>
                    </div>
                    <div>
                        <span>Номер&nbsp;участка:</span>
                    </div>
                    <div>
                        <span>Агитатор:</span>
                    </div>
                    <div>
                        <span>Участие&nbsp;раньше:</span>
                    </div>
                    <div>
                        <span>Телефон:</span>
                    </div>
                    <div>
                        <span>Избиратель:</span>
                    </div>
                </div>

                <div className={`${style.infoBlock} ${style.infoBlock2}`}>
                    {edit ? (
                        <>
                            <div>{voter?.id ?? "—"}</div>
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
                                            key={item.pollingStationId || item.poolingStationId}
                                            value={item.pollingStationId || item.poolingStationId}
                                        >
                                            {item.pollingStationNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select
                                    onChange={(e) =>
                                        setNewVoter({ ...newVoter, agitatorId: Number(e.target.value) })
                                    }
                                    value={newVoter?.agitatorId || ""}
                                >
                                    {agitators.map((item) => (
                                        <option
                                            key={item.agitatorId}
                                            value={item.agitatorId}
                                        >
                                            {item.fullName}
                                        </option>
                                    ))}
                                </select>
                                {/*<input*/}
                                {/*    onChange={(e) =>*/}
                                {/*        setNewVoter({*/}
                                {/*            ...newVoter,*/}
                                {/*            agitator: {*/}
                                {/*                ...newVoter.agitator,*/}
                                {/*                fullName: e.target.value,*/}
                                {/*            },*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*    type="text"*/}
                                {/*    value={newVoter?.agitator?.fullName || ""}*/}
                                {/*/>*/}
                            </div>
                            <div>
                                <select
                                    onChange={(e) =>
                                        setNewVoter({
                                            ...newVoter,
                                            participatedInPreviousElections: e.target.value,
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
                                    value={newVoter?.source === "NEW" ? "NEW" : "OLD"}
                                >
                                    <option value="NEW">Новый</option>
                                    <option value="OLD">Из старой базы</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>{voter?.id ?? "—"}</div>
                            <div>{voter?.pin ?? "—"}</div>
                            <div>{voter?.address ?? "—"}</div>
                            <div>{voter?.pollingStation?.pollingStationNumber ?? "—"}</div>
                            <div>
                                {voter?.agitator
                                    ? `${voter.agitator.fullName} `
                                    : "Не указан"}
                            </div>
                            <div>
                                {voter?.participatedInPreviousElections
                                    ? "Да"
                                    : voter?.participatedInPreviousElections === null
                                        ? "Неизвестно"
                                        : "Нет"}
                            </div>
                            <div>
                                {voter?.phone ? (
                                    <a style={{ color: "white" }} href={`tel:${voter.phone}`}>
                                        {voter.phone}
                                    </a>
                                ) : (
                                    "—"
                                )}
                            </div>
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
                    <Button variant="contained" className={style.editBtn} onClick={updateVoter}>
                        Готово
                    </Button>
                </div>
            ) : confirmDelete ? (
                <div className={style.buttonsConfirmPar}>
                    <p>Вы уверены?</p>
                    <div className={style.buttonsConfirm}>
                        <Button
                            variant="contained"
                            className={style.editBtn}
                            onClick={() => setConfirmDelete(false)}
                        >
                            Нет
                        </Button>
                        <Button onClick={deleteVoter} variant="contained" className={style.deleteBtn}>
                            Да
                        </Button>
                    </div>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default VoterInfoModalContent;
