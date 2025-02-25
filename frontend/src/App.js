import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchFireData, fetchWeatherData } from './WeatherService';
import Register from './components/Register'; // Make sure to create and export Register component as shown earlier
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
//import { MAP_KEY } from './config';

//npm install react-router-dom

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const mapRef = useRef(null);
  const [showRegister, setShowRegister] = useState(false);
  const MAP_KEY = process.env.REACT_APP_MAP_KEY;
  console.log(MAP_KEY);

  console.log(process.env)

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', {
          center: [39.50, -98.35], // Center of the US
          zoom: 4
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      mapRef.current = map;
    }

    fetchFireData(MAP_KEY).then(data => { // Ensure you replace 'MAP_KEY' with your actual API key or configuration
      if (data) {
        data.forEach(fire => {
          const circle = L.circle([fire.latitude, fire.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 50000
          }).addTo(mapRef.current)
            .bindPopup(`Location: ${fire.latitude}, ${fire.longitude}<br>
                        Brightness: ${fire.bright_ti4}<br>
                        FRP: ${fire.frp}`);
        });
      }
    });
  }, [MAP_KEY]);

  const handleSearch = async () => {
    const data = await fetchWeatherData(city);
    setWeather(data);
  };

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>HeatWaveSafety</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><button onClick={() => setShowRegister(true)}>Register</button></li>
          <li><a href="#info">Info</a></li>
        </ul>
      </nav>
      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowRegister(false)}>&times;</span>
            <Register />
          </div>
        </div>
      )}
      <main>
        <div id="home">
          <h2>Welcome to HeatWaveSafety</h2>
          <p>This section could contain general information about the application, its purpose, and how users can benefit from it.</p>
        </div>
        
        <div id="info">
          <h2>Heatwave Safety Information</h2>
          <p>Here you might want to include detailed information about how to stay safe during heatwaves, preventative measures, and useful tips for users.</p>
        </div>
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
      </main>
      <footer>
        <p>Footer content like contact info, copyright, and other links can go here.</p>
      </footer>
    </div>
    </Router>
  );
}

export default App;