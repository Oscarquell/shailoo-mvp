import React from 'react';
import style from "./VotersList.module.css"
import {Voters} from "../../constants/testConstants";
import VotersItem from "../../components/VotersItem/VotersItem";

const VotersList = ({voters}) => {
    return (
        <div
            className={style.container}
            style={{width:'90%'}}
        >
            <div className={style.table}>
                <VotersItem
                    nom={"№"}
                    id={"id"}
                    name={"ФИО"}
                    pin={"ИНН"}
                    address={"Адрес"}
                    phone={"Телефон"}
                    pollingStationNumber={"Изб. участок"}
                    participatedInPreviousElections={"частее раньше"}
                    agitator={"Агитатор"}
                    header={true}
                    key={"dajwdalwiufdwgwlasdbywdlc"}

                />
                {voters.map((voter, idx) =>
                    <VotersItem
                        key={voter.id}
                        name={voter.name}
                        pin={voter.pin}
                        nom={idx + 1}
                        address={voter.address}
                        phone={voter.phone}
                        pollingStationNumber={voter.pollingStationNumber}
                        participatedInPreviousElections={voter.participatedInPreviousElections}
                        agitator={voter.agitator}
                        header={false}
                    />
                )}

            </div>
        </div>
    );
};

export default VotersList;