import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Authorization from "../pages/authorization/authorization";
import HomePage from "../pages/homePage/homePage"


const MainRoutes = () => {

    function PrivateRoute({ children }) {
        //const accessToken = localStorage.getItem("accessToken");
        const accessToken = 'test'
        return accessToken ? (
            children
        ) : (
            <Navigate to="/login" replace />
        );
    }

    return (
    <Routes>
        <Route index element={ <PrivateRoute> <HomePage /> </PrivateRoute> } />
        <Route path="/login" element={<Authorization />} />
    </Routes>
    );
};

export default MainRoutes;