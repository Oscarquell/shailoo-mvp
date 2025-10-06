import React, {useState} from 'react';
import Search from "../../modules/Search/Search";
import VotersList from "../../modules/VotersList/VotersList";
import Pagination from "../../modules/Pagination/Pagination";
import {Voters} from "../../constants/testConstants";

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil((Voters?.length || 0) / ITEMS_PER_PAGE));

    return (
        <>
            <Search />
            <VotersList />
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
