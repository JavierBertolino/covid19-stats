import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import { Typography } from "@material-ui/core";
import styles from "./App.module.css";
import { getData } from "./api/apiHandler";

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState('');

  useEffect(() => {
    async function setRetrievedData() {
      const fetchedData = await getData();
      setData(fetchedData);
    };

    setRetrievedData()
  },[])

  async function handleCountryChange(country) {
    const countryData = await getData(country);
    setData(countryData);
    setCountry(country);
  }

  return (
    <div className={styles.container}>
      <br />
      <Typography variant="h4">
      <b>Global and Country Wise Cases of Corona Virus (COVID-19)</b>
      </Typography>
      <Typography variant="body1">
      <i>(For a Particular country, select a Country from below)</i>
      </Typography>
      <br />
      <br />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Cards data={data} country={country} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
