import React, { useEffect, useState } from "react";
import Search from "../../modules/Search/Search";
import VotersList from "../../modules/VotersList/VotersList";
import Pagination from "../../modules/Pagination/Pagination";
import { getVotersList } from "../../API/getVoterList";
import { showError } from "../../utils/alerts";
import { axiosInstance } from "../../API/api";

const HomePage = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(() => localStorage.getItem("perPage") || 200);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [voters, setVoters] = useState([]);
    const [filters, setFilters] = useState({})

    async function getVoters() {
        try {
            const data = await getVotersList(page, size, filters);
            console.log(data);
            setVoters(data.voters);
            setTotalPages(data.pagination.totalPages);
        } catch (error) {
            showError("Ошибка", `Ошибка при загрузке голосующих: ${error}`);
        }
    }

    useEffect(() => {
        getVoters();
    }, [page, filters, size]);

    return (
        <>
            <Search
                size={size}
                page={page}
                setPage={setPage}
                getVoters={getVoters}
                setVoters={setVoters}
                setFilters={setFilters}
                filters={filters}
                setSize={setSize}
            />

            <VotersList getVoters={getVoters} voters={voters} />
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
