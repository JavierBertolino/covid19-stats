import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { getCountries } from "../../api/apiHandler";

function CountryPicker({ handleCountryChange }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            setCountries(await getCountries());
        };

        fetchCountries();
    }, [setCountries]);

    return (
        <FormControl className={styles.FormControl}>
            <NativeSelect
                defaultValue=""
                onChange={(e) => handleCountryChange(e.target.value)}
            >
                <option value="">Global</option>
                {countries.map((country, key) => (
                    <option key={key} value={country}>
                        {country}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;