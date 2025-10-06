import React from 'react';
import Search from "../../modules/Search/Search";
import VotersList from "../../modules/VotersList/VotersList";

const HomePage = () => {
    return (
        <>
            <Search />
            <VotersList />
        </>
    );
};

export default HomePage;