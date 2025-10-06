import React from 'react';
import style from "./Search.module.css"
import ButtonComponent from "../../components/button/button";
import {votes} from "../../constants/testVotes";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import InputComponent from "../../components/Input/Input";
import SearchIcon from "../../assets/icons/searchIcon.svg"

const Search = () => {
    return (
        <div>
            <div className={style.FiltersParent}>
                <AutoComplete
                    style={{
                        width: "400px",
                        "& .MuiInputBase-root": {
                            backgroundColor: "white", // фон самого поля
                            borderRadius: "5px",
                        },
                    }}
                    items={votes.map((item) => {
                        return (item.pollingStationNumber)})
                    }
                    label="Участки"
                />
                <AutoComplete
                    style={{
                        width: "400px",
                        "& .MuiInputBase-root": {
                            backgroundColor: "white", // фон самого поля
                            borderRadius: "5px",
                        },
                    }}
                    items={[{id: 1, value: "Человек 1"},{id: 2, value: "Человек 2"},{id: 2, value: "Человек 2"},].map((item) => item.value)}
                    label={"Агитатор"}
                />
                <ButtonComponent
                    text={"Добавить"}
                    style={{
                        color: "black",
                        width: "400px",
                        backgroundColor: "white",
                        height: "50px"
                }}
                />
            </div>
            <div className={style.SearchParent}>
                <InputComponent
                    label="ФИО / Адрес / ИНН"
                    sx={{
                        width: '100%',
                        borderRadius: "5px",
                        backgroundColor: '#fff',
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#ccc", // цвет рамки
                            },
                            "&:hover fieldset": {
                                borderColor: "#888",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#1976d2", // рамка при фокусе
                            },
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