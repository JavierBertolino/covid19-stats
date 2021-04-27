import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

function Chart({ data, country }) {
    let lineChart;
    const dailyData = data


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
                            fill: false
                        },
                        {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: "Deaths",
                            borderColor: "red",
                            backgroundColor: "rgba(255,0,0,0.5)",
                            fill: false
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` }
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