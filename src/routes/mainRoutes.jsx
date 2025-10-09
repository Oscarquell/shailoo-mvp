import React from 'react';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Authorization from "../pages/authorization/authorization";
import HomePage from "../pages/homePage/homePage";
import StatisticsPage from "../pages/statisticsPage/statisticsPage";
import Sidebar from "../components/sideBar/sideBar";
import PollingInfoPage from "../pages/pollingInfoPage/pollingInfoPage";

const MainRoutes = () => {
    const location = useLocation();

    const accessToken = 'test';

    function PrivateRoute({ children }) {
        return accessToken ? children : <Navigate to="/login" replace />;
    }

    const isPrivatePage = location.pathname !== "/login";

    return (
        <>
            {isPrivatePage && <Sidebar />}  {/* ✅ sidebar только на приватных страницах */}

            <div style={{ padding: "0px" }}>
                <Routes>
                    <Route
                        index
                        element={<PrivateRoute><HomePage /></PrivateRoute>}
                    />
                    <Route
                        path="/statistics"
                        element={<PrivateRoute><StatisticsPage /></PrivateRoute>}
                    />
                    <Route
                        path="/polling-info"
                        element={<PrivateRoute><PollingInfoPage /></PrivateRoute>}
                    />
                    <Route path="/login" element={<Authorization />} />
                </Routes>
            </div>
        </>
    );
};

export default MainRoutes;
