import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { votes } from "../../constants/testVotes";
import { useNavigate } from "react-router-dom";
import "./statistics.css";

export default function StatisticsPage() {
    const navigate = useNavigate();
    const BackToHomePage = () => {
        navigate("/");
    };

    return (
        <div className="statistics-container">
            <input type="button" value="Вернуться в систему" onClick={BackToHomePage} />
            <h2 className="chart-title">Статистика по избирательным участкам</h2>
            <ResponsiveContainer width="95%" height="80%">
                <LineChart data={votes} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
                    <XAxis
                        dataKey="pollingStationNumber"
                        label={{ value: "Участок", position: "insideBottomRight", offset: -5 }}
                        stroke="#ffffff"
                    />
                    <YAxis
                        label={{ value: "Голоса", angle: -90, position: "insideLeft" }}
                        stroke="#ffffff"
                    />
                    <Tooltip
                        labelFormatter={(label) => `Уч. № ${label}`}
                        contentStyle={{
                            backgroundColor: "#fff",
                            color: "#0067B1",
                            borderRadius: "6px",
                            border: "none",
                            fontWeight: 600,
                        }}
                    />
                    <Legend wrapperStyle={{ color: "#fff" }} />
                    <Line
                        type="monotone"
                        dataKey="vote"
                        name="Голоса"
                        stroke="#ffffff"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
