import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import { Typography } from "@material-ui/core";
import styles from "./App.module.css";
import { getData, getDailyData } from "./api/apiHandler";

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function setRetrievedData() {
      const fetchedData = await getData();
      setData(fetchedData);
    };

    setRetrievedData()
  }, [])

  async function handleCountryChange(country) {
    const countryData = await getData(country);
    const fetchedChartData = await getDailyData(country);
    setCountry(country);
    setData(countryData);
    setChartData(fetchedChartData);
  }

  return (
    <div className={styles.container}>
      <br />
      <Typography variant="h3">
        <b>Global and Country Wise Cases of Corona Virus (COVID-19)</b>
      </Typography>
      <Typography variant="body1">
        <i>(For a Particular country, select a Country from below)</i>
      </Typography>
      <br />
      <br />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Cards data={data} country={country} />
      <Chart data={chartData} country={country} />
    </div>
  );
}

export default App;
