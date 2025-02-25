import axios from 'axios';
import moment from 'moment';
import Papa from 'papaparse';

export const fetchFireData = async () => {
  const url = `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${process.env.MAP_KEY}/MODIS_NRT/USA/7`;
  try {
      const response = await axios.get(url, {
          responseType: 'blob'  // Important: Handle CSV data as a Blob
      });

      return new Promise((resolve, reject) => {
          Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                  const data = results.data.map(item => ({
                      ...item,
                      acq_datetime: moment(item.acq_date + ' ' + item.acq_time.padStart(4, '0'), 'YYYY-MM-DD HHmm').toDate()
                  }));
                  resolve(data);
              },
              error: (error) => reject(error)
          });
      });
  } catch (error) {
      console.error('Error fetching fire data:', error);
  }
};

export const fetchWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

//export default fetchWeatherData;
