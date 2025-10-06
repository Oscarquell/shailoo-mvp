import React from 'react';
import SelectComponent from "../../components/Select/Select";
import ButtonComponent from "../../components/button/button";

const Search = () => {
    return (
        <div>
            <div>
                <SelectComponent
                    label={"Участок"}
                    items={[{id: 1, value: "1"},{id: 2, value: "2"},{id: 2, value: "2"},]}
                    id={"station"}
                    width={"200px"}
                />
                <SelectComponent
                    label={"Участок"}
                    items={[{id: 1, value: "1"},{id: 2, value: "2"},{id: 2, value: "2"},]}
                    id={"station"}
                    width={"200px"}
                />
                <ButtonComponent
                    text={"Добавить"}
                    style={{background: "fff"}}
                />
            </div>
        </div>
    );
};

export default Search;