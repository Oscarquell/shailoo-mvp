import React, {useEffect, useState} from 'react';
import Search from "../../modules/Search/Search";
import VotersList from "../../modules/VotersList/VotersList";
import Pagination from "../../modules/Pagination/Pagination";
import {getVotersList} from "../../API/getVoterList";
import {showError} from "../../utils/alerts";

const ITEMS_PER_PAGE = 50;

const HomePage = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [voters, setVoters] = useState([]);

    const totalPages = Math.max(1, Math.ceil((voters?.length || 0) / ITEMS_PER_PAGE));

    async function getVoters() {
        try {
            const voters = await getVotersList(page, size);
            setVoters(voters);
        } catch (error) {
            showError('Ошибка', `Ошибка при загрузке голосующих: ${error}`);
        }
    }

    useEffect(() => {
        getVoters(page, size)
    }, [])

    return (
        <>

            <Search getVoters={getVoters} setPage={setPage} setVoters={setVoters} />
            <VotersList getVoters={getVoters} setVoters={setVoters} voters={voters} />
            {totalPages > 1 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            )}
        </>
    );

};


export default HomePage;
