import React, { useEffect, useState } from 'react';
import style from "./VotersList.module.css";
import VotersItem from "../../components/VotersItem/VotersItem";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import VoterInfoModalContent from "../VoterInfoModalContent/VoterInfoModalContent";

const VotersList = ({ voters, setVoters, page = 1 }) => {
    const [voterId, setVoterId] = useState(null);
    const [modalWindow, setModalWindow] = useState(false);
    const [modalSize, setModalSize] = useState({ width: 40, height: 70, marginTop: "10vh" });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width <= 480) {
                // Мобильные
                setModalSize({ width: 95, height: 90, marginTop: "5vh" });
            } else if (width <= 768) {
                // Планшеты
                setModalSize({ width: 80, height: 80, marginTop: "6vh" });
            } else if (width <= 1030) {
                // Небольшие ноутбуки
                setModalSize({ width: 60, height: 75, marginTop: "8vh" });
            } else {
                // Десктоп
                setModalSize({ width: 40, height: 70, marginTop: "10vh" });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={style.container} style={{ width: '90%' }}>
            {modalWindow && (
                <ModalWindow
                    width={modalSize.width}
                    height={modalSize.height}
                    marginTop={modalSize.marginTop}
                    setIsOpened={setModalWindow}
                >
                    <VoterInfoModalContent
                        setIsOpened={setModalWindow}
                        setVoters={setVoters}
                        id={voterId}
                    />
                </ModalWindow>
            )}

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
                    key={"headerRow"}
                />

                {voters.map((voter, idx) => (
                    <VotersItem
                        onClick={() => {
                            setVoterId(voter.id);
                            setModalWindow(true);
                        }}
                        key={voter.id}
                        name={voter.name}
                        address={voter.address}
                        nom={(idx + 1) + (page > 1 ? page * 200 : 0)}
                        pollingStationNumber={voter.pollingStationNumber}
                        header={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default VotersList;
