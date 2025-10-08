import React, { useEffect, useState } from "react";
import style from "./Search.module.css";
import ButtonComponent from "../../components/button/button";
import { votes } from "../../constants/testVotes";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import InputComponent from "../../components/Input/Input";
import { useTheme, useMediaQuery } from "@mui/material";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import AddVoterModalContent from "../AddVoterModalContent/AddVoterModalContent";
import { axiosInstance } from "../../API/api";

const Search = ({ setVoters, setPage, page }) => {
    const [modalWindow, setModalWindow] = useState(false);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const [searchValue, setSearchValue] = useState("");

    // ======== Поиск с debounce ========
    useEffect(() => {
        // Не искать, если меньше 3 символов
        if (searchValue.trim().length < 3 && searchValue.trim().length !== 0) return;

        const delayDebounce = setTimeout(async () => {
            try {
                const { data } = await axiosInstance.get(`/voters/search?q=${searchValue}&page=${page}`);
                setPage(1)
                setVoters(data);
            } catch (e) {
                console.error(e);
            }
        }, 500); // задержка 500мс

        // Очистка таймера при изменении значения
        return () => clearTimeout(delayDebounce);
    }, [searchValue]);

    return (
        <div>
            {modalWindow && (
                <ModalWindow
                    setIsOpened={setModalWindow}
                    width={
                        isSmall
                            ? 90    // смартфон (почти на весь экран)
                            : isTablet
                                ? 70 // планшет
                                : 40 // десктоп
                    }
                    height={
                        isSmall
                            ? 90    // почти вся высота
                            : isTablet
                                ? 80
                                : 75
                    }
                    marginTop={isSmall ? "5vh" : "10vh"}
                >
                    <AddVoterModalContent setIsOpened={setModalWindow} />
                </ModalWindow>
            )}


            {/* ======== ФИЛЬТРЫ ======== */}
            <div className={style.FiltersParent}>
                <AutoComplete
                    style={{
                        width: isSmall ? "100%" : isTablet ? "320px" : "400px",
                    }}
                    items={votes.map((item) => item.pollingStationNumber)}
                    label="Участки"
                />

                <AutoComplete
                    style={{
                        width: isSmall ? "100%" : isTablet ? "320px" : "400px",
                    }}
                    items={[
                        { id: 1, value: "Человек 1" },
                        { id: 2, value: "Человек 2" },
                        { id: 3, value: "Человек 3" },
                    ].map((item) => item.value)}
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
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value.length > 3) {
                                setPage(1);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
