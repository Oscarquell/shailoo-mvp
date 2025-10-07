import React, {useEffect, useState} from 'react';
import Search from "../../modules/Search/Search";
import VotersList from "../../modules/VotersList/VotersList";
import Pagination from "../../modules/Pagination/Pagination";
import {Voters} from "../../constants/testConstants";
import {axiosInstance} from "../../API/api";
import {getVotersList} from "../../API/getVoterList";

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [voters, setVoters] = useState([]);

    const totalPages = Math.max(1, Math.ceil((Voters?.length || 0) / ITEMS_PER_PAGE));

    async function getVoters() {
        const voters = await getVotersList()
        setVoters(voters)
    }

    useEffect(() => {
        getVoters()
    }, [])

    return (
        <>

            <Search />
            <VotersList setVoters={setVoters} voters={voters} />
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
