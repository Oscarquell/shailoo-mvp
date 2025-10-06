import React from 'react';
import style from "./VotersList.module.css"
import {Voters} from "../../constants/testConstants";

const VotersList = () => {
    return (
        <div
            className={style.container}
            style={{width:'90%'}}
        >
            <div className={style.table}>
                <div className={style.voter}>
                    <div>№</div>
                    <div>id</div>
                    <div>ФИО</div>
                    <div>Телефон</div>
                    <div></div>
                </div>
                {Voters.map((voter, idx) =>
                    <div key={voter.id} className={style.voter}>
                        <div>{idx + 1}</div>
                        <div>{voter.id}</div>
                        <div>{voter.name}</div>
                        <div>{voter.phone}</div>
                        <div className={style.tools}>
                            <button className={style.copyBtn}>copy</button>
                            <button className={style.copyBtn}>Подробнее</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VotersList;