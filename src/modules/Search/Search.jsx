import React from 'react';
import style from "./Search.module.css"
import SelectComponent from "../../components/Select/Select";
import ButtonComponent from "../../components/button/button";

const Search = () => {
    return (
        <div>
            <div className={style.FiltersParent}>
                <SelectComponent
                    label={"Участок"}
                    items={[{id: 1, value: "1"},{id: 2, value: "2"},{id: 2, value: "2"},]}
                    id={"station"}
                    style={{backgroundColor: "white", width: "200px", height: "40px" }}
                />
                <SelectComponent
                    label={"Агитатор"}
                    items={[{id: 1, value: "Человек 1"},{id: 2, value: "Человек 2"},{id: 2, value: "Человек 2"},]}
                    id={"station"}
                    style={{backgroundColor: "white", width: "200px", height: "50px" }}
                />
                <ButtonComponent
                    text={"Добавить"}
                    style={{color: "black", backgroundColor: "white", width: "200px", height: "50px", padding: "0", margin: "0"}}
                />
            </div>
            <div>

            </div>
        </div>
    );
};

export default Search;