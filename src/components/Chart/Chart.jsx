import React, { useState, useEffect } from "react";
import { getDailyData } from "../../api/apiHandler";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

function Chart({ data: { confirmed, recovered, deaths }, country }) {
    let lineChart;
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchDailyData = async () => {
            setDailyData(await getDailyData(country));
        };

        fetchDailyData();
    }, []);

    console.log(dailyData);
    if (dailyData) {
        lineChart = dailyData.length > 0 ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [
                        {
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: "Infected",
                            borderColor: "#3333ff",
                            fill: true
                        },
                        {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: "Deaths",
                            borderColor: "red",
                            backgroundColor: "rgba(255,0,0,0.5)",
                            fill: true
                        },
                    ],
                }}
            />
        ) : null;
    }

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;