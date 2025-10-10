import React, { useEffect, useState } from "react";
import style from "./Search.module.css";
import ButtonComponent from "../../components/button/button";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import InputComponent from "../../components/Input/Input";
import { useTheme, useMediaQuery } from "@mui/material";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import AddVoterModalContent from "../AddVoterModalContent/AddVoterModalContent";
import { axiosInstance } from "../../API/api";
import { showError } from "../../utils/alerts";
import { getAgitatorsList } from "../../API/getAgitatorsList";
import SelectComponent from "../../components/Select/Select";

const Search = ({ getVoters, setVoters, setPage, size, setSearchQuery, setSize }) => {
    const [modalWindow, setModalWindow] = useState(false);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const [pollingStations, setPollingStations] = useState([]);
    const [agitators, setAgitators] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    // === Получение участков ===
    async function getPollingStations() {
        try {
            const { data } = await axiosInstance.get("/polling-stations");
            setPollingStations(data);
        } catch (e) {
            console.error("Ошибка при загрузке участков:", e);
            showError("Ошибка при получении Избирательных участков!");
        }
    }

    // === Получение агитаторов ===
    async function getAgitators() {
        try {
            const data = await getAgitatorsList();
            setAgitators(data);
        } catch (e) {
            console.error("Ошибка при загрузке агитаторов:", e);
            showError("Ошибка при получении агитаторов!");
        }
    }

// === При изменении поискового поля ===
    useEffect(() => {
        const trimmed = searchValue.trim();

        const timeout = setTimeout(() => {
            // Если пользователь полностью очистил поле — получаем весь список
            if (trimmed.length === 0) {
                setSearchQuery("");
                setPage(0);
                return;
            }

            // Если длина >= 3 символов — запускаем поиск
            if (trimmed.length >= 3) {
                setSearchQuery(trimmed);
                setPage(0);
            }

            // Если длина 1–2 символа — ничего не делаем
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchValue]);


    useEffect(() => {
        getPollingStations();
        getAgitators();
    }, []);

    return (
        <div>
            <ModalWindow
                isOpened={modalWindow}
                setIsOpened={setModalWindow}
                width={isSmall ? 90 : isTablet ? 70 : 40}
                marginTop={isSmall ? "5vh" : "10vh"}
            >
                <AddVoterModalContent
                    getVoters={getVoters}
                    setVoters={setVoters}
                    setIsOpened={setModalWindow}
                />
            </ModalWindow>

            {/* ======== ФИЛЬТРЫ ======== */}
            <div className={style.FiltersParent}>
                <AutoComplete
                    style={{
                        width: isSmall ? "100%" : isTablet ? "320px" : "400px",
                    }}
                    items={pollingStations.map((item) => item.pollingStationNumber)}
                    label="Участки"
                />

                <AutoComplete
                    style={{
                        width: isSmall ? "100%" : isTablet ? "320px" : "400px",
                    }}
                    items={agitators.map((item) => item.fullName)}
                    label="Агитатор"
                />



                <ButtonComponent
                    text="Добавить"
                    onClick={() => setModalWindow(true)}
                    style={{
                        color: "#fff",
                        width: isSmall ? "100%" : isTablet ? "160px" : "200px",
                        background: "linear-gradient(135deg, #39B54A 0%, #0E62AA 100%)",
                        height: "50px",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
                        borderRadius: "5px",
                        fontWeight: 500,
                        fontSize: isSmall ? "15px" : "17px",
                    }}
                />
            </div>

            {/* ======== ПОИСК ======== */}
            <div className={style.SearchParent}>
                <div className={style.searchWrapper}>
                    <InputComponent
                        label="ФИО / Адрес / ИНН"
                        sx={{
                            background: "none",
                            width: "100%",
                            height: "51px",
                            borderRadius: "5px 0 0 5px",
                            color: "#fff",
                            "& .MuiInputLabel-root": { color: "#fff" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "#fff" },
                                "&.Mui-focused fieldset": { borderColor: "#00e676" },
                            },
                            "& .MuiInputBase-input::placeholder": {
                                color: "#fff",
                                opacity: 1,
                            },
                        }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <SelectComponent
                        onChange={(e) => {
                            setSize(e.target.value)
                            localStorage.setItem("perPage", e.target.value);
                        }}
                        value={size}
                        label={"На странице"}
                        items={[
                            {value: 5, id: 5},
                            {value: 10, id: 10},
                            {value: 20, id: 20},
                            {value: 50, id: 50},
                            {value: 100, id: 100},
                            {value: 200, id: 200},
                            {value: 500, id: 500},
                        ]}
                        style={{width: "200px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
