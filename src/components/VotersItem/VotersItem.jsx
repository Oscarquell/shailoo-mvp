import React from 'react';
import style from "./VotersItem.module.css";

const VotersItem = ({nom, name, address, pollingStationNumber, header, onClick}) => {
    return (
        <div
            onClick={onClick}
            className={style.voter}
            style={{gridTemplateColumns: "50px 1fr 1fr 120px 120px"}}
        >
            <div>{nom}</div>
            <div>{name}</div>
            <div>{address}</div>
            <div>{pollingStationNumber}</div>
            {!header ?
                <div className={style.tools}>
                    {/*<button className={style.copyBtn}>copy</button>*/}
                    {/*<button className={style.copyBtn}>Подробнее</button>*/}
                    {/*<button className={style.copyBtn}>Изменить</button>*/}
                    {/*<button className={style.copyBtn}>Удалить</button>*/}
                </div>
                :
                <div>Инструменты</div>
            }

        </div>
    );
};

export default VotersItem;