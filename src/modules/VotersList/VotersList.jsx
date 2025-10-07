import React, {useEffect, useState} from 'react';
import style from "./VotersList.module.css"
import VotersItem from "../../components/VotersItem/VotersItem";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

import VoterInfoModalContent from "../VoterInfoModalContent/VoterInfoModalContent";

const VotersList = ({voters, setVoters, page = 1}) => {
    const [voterId, setVoterId] = useState(null)
    const [modalWindow, setModalWindow] = useState(false)



    return (
        <div
            className={style.container}
            style={{width:'90%'}}
        >
            {modalWindow &&
                <ModalWindow width={40} height={70} marginTop={`${70 / 5}vh`} setIsOpened={setModalWindow}>
                    <VoterInfoModalContent setIsOpened={setModalWindow} setVoters={setVoters} id={voterId} />
                </ModalWindow>
            }
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
                    header={false}
                    key={"dajwdalwiufdwgwlasdbywdlc"}

                />
                {voters.map((voter, idx) =>
                    <VotersItem
                        onClick={() => {setVoterId(voter.id);setModalWindow(true)}}
                        key={voter.id}
                        name={voter.name}
                        address={voter.address}
                        nom={(idx + 1) + (page > 1 ? page * 200 : 0)}
                        pollingStationNumber={voter.pollingStationNumber}
                        header={false}
                    />
                )}

            </div>
        </div>
    );
};

export default VotersList;