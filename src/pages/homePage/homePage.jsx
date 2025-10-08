import React, {useEffect, useState} from 'react';
import Search from "../../modules/Search/Search";
import VotersList from "../../modules/VotersList/VotersList";
import Pagination from "../../modules/Pagination/Pagination";
import {Voters} from "../../constants/testConstants";
import {axiosInstance} from "../../API/api";
import {getVotersList} from "../../API/getVoterList";
import {useNavigate} from "react-router-dom";

const ITEMS_PER_PAGE = 50;

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [voters, setVoters] = useState([]);
    const navigate = useNavigate()

    const totalPages = Math.max(1, Math.ceil((voters?.length || 0) / ITEMS_PER_PAGE));

    async function getVoters() {
        try {
            const voters = await getVotersList(page);
            setVoters(voters);
        } catch (e) {
            navigate("/login")
        }
    }

    useEffect(() => {
        getVoters()
    }, [])

    return (
        <>

            <Search setPage={setPage} setVoters={setVoters} />
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
