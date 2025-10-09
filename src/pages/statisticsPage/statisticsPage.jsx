import React, {useEffect, useState} from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Rectangle,} from "recharts";
import "./statistics.css";
import {axiosInstance} from "../../API/api";
import {testAgitators} from "../../constants/testAgitators";
import {showError} from "../../utils/alerts";


export default function StatisticsPage() {

    const [votes, setVotes] = useState([])
    const [newVotes, setNewVotes] = useState([]);
    const [agitators, setAgitators] = useState([])

    const getStatistics = async () => {
        try {
            const response = await axiosInstance.get('statistics/polling-stations');
            const data = await response.data;
            setVotes(data)
        } catch (error) {
            showError('Ошибка', `'Ошибка при загрузке статистики: ${error}'`);
        }
    }

    const getStatisticsBySources = async () => {
        try {
            const response = await axiosInstance.get('statistics/polling-stations/by-sources');
            const data = response.data;
            const newSources = data.filter(item => item.source === 'new');
            setNewVotes(newSources);
        } catch (error) {
            showError('Ошибка', `'Ошибка при загрузке статистики: ${error}'`);
        }
    };

    const getAgitatorsStatistics = async () => {
        try {
            const response = await axiosInstance.get('statistics/agitators');
            const data = response.data;
            setAgitators(data);
        } catch (error) {
            showError('Ошибка', `'Ошибка при загрузке статистики агитаторов: ${error}'`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getStatistics();
                await getStatisticsBySources();
                await getAgitatorsStatistics();
            } catch (error) {
                showError('Ошибка', `'Ошибка при загрузке статистики: ${error}'`);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="statistics-container">
            <h2 className="chart-title">Общий потенциал по избирательным участкам</h2>
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



            <h2 className="chart-title">Потенциал по избирательным участкам за этот год (новые)</h2>
            <ResponsiveContainer width="95%" height="80%">
                <LineChart data={newVotes} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
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
                        dataKey="voterCount"
                        name="Голоса"
                        stroke="#ffffff"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            <h2 className="chart-title">Статистика по агитаторам</h2>
            <ResponsiveContainer width="95%" height="80%">
                <BarChart
                    width={500}
                    height={300}
                    data={agitators}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='name'  />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => [`Кол-во голосов: ${value}`, '']}
                        labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Bar dataKey="voterCount" fill="#82ca9d" activeBar={<Rectangle fill="pink" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}
