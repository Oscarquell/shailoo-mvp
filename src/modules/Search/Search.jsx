import React from 'react';
import style from "./Search.module.css";
import ButtonComponent from "../../components/button/button";
import {votes} from "../../constants/testVotes";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import InputComponent from "../../components/Input/Input";
import SearchIcon from "../../assets/icons/searchIcon.svg";
import {useTheme, useMediaQuery} from "@mui/material";

const Search = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm')); // <600px

    return (
        <div>
            {/* ======== ФИЛЬТРЫ ======== */}
            <div className={style.FiltersParent}>
                <AutoComplete
                    sx={{
                        width: isSmall ? "100%" : "400px",
                        "& .MuiInputBase-root": {
                            borderRadius: "5px",
                            backgroundColor: "white",
                        },
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                    }}
                    items={votes.map((item) => item.pollingStationNumber)}
                    label="Участки"
                />

                <AutoComplete
                    sx={{
                        width: isSmall ? "100%" : "400px",
                        "& .MuiInputBase-root": {
                            borderRadius: "5px",
                            backgroundColor: "white",
                        },
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                    }}
                    items={[
                        {id: 1, value: "Человек 1"},
                        {id: 2, value: "Человек 2"},
                        {id: 3, value: "Человек 3"}
                    ].map((item) => item.value)}
                    label="Агитатор"
                />

                <ButtonComponent
                    text="Добавить"
                    style={{
                        color: "white",
                        width: isSmall ? "100%" : "200px",
                        background: "linear-gradient(135deg, #39B54A 0%, #0E62AA 100%)",
                        height: "50px",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
                        borderRadius: "5px",
                        fontWeight: 500,
                        fontSize: isSmall ? "16px" : "17px",
                    }}
                />
            </div>

            {/* ======== ПОИСК ======== */}
            <div className={style.SearchParent}>
                <InputComponent
                    label="ФИО / Адрес / ИНН"
                    sx={{
                        background: "none",
                        width: '100%',
                        borderRadius: "5px",
                        color: "black",
                        "& .MuiInputLabel-root": {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "rgba(21,19,19,0.18)" },
                            "&:hover fieldset": { borderColor: "#2c2c2c" },
                            "&.Mui-focused fieldset": { borderColor: "rgba(21,19,19,0.18)" },
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "black",
                            opacity: 1,
                        },
                    }}
                />
                <button className={style.searchBtn}>
                    <img src={SearchIcon} alt="search"/>
                </button>
            </div>
        </div>
    );
};

export default Search;
