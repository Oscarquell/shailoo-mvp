import React, {useEffect, useState} from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
 BarChart, Bar, Rectangle,
} from "recharts";
import "./statistics.css";
import {axiosInstance} from "../../API/api";
import {testAgitators} from "../../constants/testAgitators";


export default function StatisticsPage() {

    const [votes, setVotes] = useState([])

    const getStatistics = async () => {
        const response = await axiosInstance.get('polling-stations/statistics')
        const data = await response.data;
        console.log(data)
        setVotes(data)
    }

    useEffect(() => {
        getStatistics()
    }, [])


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

            <h2 className="chart-title">Потенциал по избирательным участкам за прошлые выборы</h2>
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

            <h2 className="chart-title">Потенциал по избирательным участкам за этот год</h2>
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

            <h2 className="chart-title">Статсистика по агитаторам</h2>
            <ResponsiveContainer width="95%" height="80%">
                <BarChart
                    width={500}
                    height={300}
                    data={testAgitators}
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
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="pink" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}
