import axios from 'axios';

const baseURL = "https://api.covid19api.com";

export const getData = async (country) => {
    const requestUrl = country ? `${baseURL}/total/country/${country}` : `${baseURL}/summary`;
    try {
        const { data } = await axios.get(requestUrl);

        if (country) {
            const countryData = data[data.length - 1];
            return {
                confirmed: countryData.Confirmed,
                recovered: countryData.Recovered,
                deaths: countryData.Deaths,
                lastUpdate: countryData.Date
            }
        } else {
            console.log('global data')
            return {
                confirmed: data.Global.TotalConfirmed,
                recovered: data.Global.TotalRecovered,
                deaths: data.Global.TotalDeaths,
                lastUpdate: data.Global.Date
            }

        }
    } catch (e) {
        console.log('Failed to retrieve data', e);
        throw e;
    }
}

export const getDailyData = async (country) => {
    console.log('getting from', country)
    try {
        const { data } = await axios.get(`${baseURL}/live/country/${country}`);
        console.log('countrydata', data);
        const parsedData = data.map((dailyData) => {
            return {
                confirmed: dailyData.Confirmed,
                deaths: dailyData.Deaths,
                date: dailyData.Date
            }
        });

        return parsedData;

    } catch (e) {
        console.log('Failed to retrieve daily data', e);
        throw e;
    }
}

export async function getCountries() {
    try {
        const { data } = await axios.get(`${baseURL}/countries`);
        return data.map((country) => country.Country).sort();

    } catch (e) {
        console.log('Failed to retrieve countries');
        throw e;
    }
}