import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchFireData, fetchWeatherData } from './WeatherService';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', {
          center: [39.50, -98.35], // Center of the US
          zoom: 4
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      mapRef.current = map;
    }

    // Fetch and plot fire data
    fetchFireData('e9b71104463f4639ddf682844d4b0dd1').then(data => {
      if (data) {
        data.forEach(fire => {
          const circle = L.circle([fire.latitude, fire.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 50000 // Adjust radius based on the scale or intensity if available
          }).addTo(mapRef.current)
            .bindPopup(`Location: ${fire.latitude}, ${fire.longitude}<br>
                        Brightness: ${fire.bright_ti4}<br>
                        FRP: ${fire.frp}`);
        });
      }
    });
  }, []);

  const handleSearch = async () => {
    const data = await fetchWeatherData(city);
    setWeather(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>HeatWaveSafety</h1>
      </header>
      <div className="main">
        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" />
        <button className="button" onClick={handleSearch}>Get Weather</button>
        {weather && (
          <div className="body">
            <p>City Name: {weather.name}</p>
            <p>Temperature: {weather.main.temp} °F</p>
            <p>Weather Description: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Low/Min Temp: {weather.main.temp_min} °F</p>
            <p>High/Max Temp: {weather.main.temp_max} °F</p>
            <p>Wind Speed/Gusts: {weather.wind.speed} mph</p>
          </div>
        )}
      </div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default App;