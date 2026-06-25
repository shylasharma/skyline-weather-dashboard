import { useState, useEffect } from "react";
import "./App.css";

import WeatherCard from "./components/WeatherCard";
import WeatherStats from "./components/WeatherStats";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import AirQuality from "./components/AirQuality";
import SunCard from "./components/SunCard";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";

import {
  getWeather,
  getWeatherByCoords,
} from "./services/weatherService";

function getBackgroundClass(code, isDay) {

  if (!isDay) return "night";

  if (code === 0) return "clear";

  if (code === 1 || code === 2 || code === 3) return "cloud";

  if (code >= 45 && code <= 48) return "fog";

  if (code >= 51 && code <= 82) return "rain";

  if (code >= 95) return "storm";

  return "clear";
}

function App() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const backgroundClass = weatherData
    ? getBackgroundClass(
        weatherData.current.weather_code,
        weatherData.current.is_day
      )
    : "clear";

  
  // Auto detect location
  useEffect(() => {

    const loadLocation = () => {

      navigator.geolocation.getCurrentPosition(

        async (position) => {

          setLoading(true);

          const data = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );

          if (data) {
            setWeatherData(data);
          }

          setLoading(false);

        },

        () => {
          setLoading(false);
        }

      );

    };

    loadLocation();

  }, []);

  // Search weather
  const handleSearch = async (searchCity = city) => {

    if (!searchCity.trim()) return;

    setLoading(true);

    const data = await getWeather(searchCity);

    if (data) {
      setWeatherData(data);
      setCity(data.city);
    } else {
      alert("City not found");
    }

    setLoading(false);

  };

  return (
    <div className={`app ${backgroundClass}`}>

      <nav className="navbar">

        <h2 className="logo">
          SKYLINE
        </h2>

        <ul>
          <li>Home</li>
          <li>Forecast</li>
          <li>Map</li>
          <li>About</li>
        </ul>

      </nav>

      <section className="hero">

        <h1>
          The Weather,
          <br />
          <span>where you are.</span>
        </h1>

        <p>
          Get accurate weather forecasts for any city around the world.
        </p>

        <SearchBar
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
        />

      </section>

      {loading ? (

        <div className="loading">

  <div className="loader"></div>

  <h2>Fetching Live Weather...</h2>

  <p>Please wait a moment</p>

</div>

      ) : (

        <>
          <div className="dashboard-top">

            <div className="left-panel">
              <WeatherCard weatherData={weatherData} />
            </div>

            <div className="right-panel">
              <WeatherStats weatherData={weatherData} />
            </div>

          </div>

          <Forecast weatherData={weatherData} />

          <HourlyForecast weatherData={weatherData} />

          <AirQuality weatherData={weatherData} />

          <SunCard weatherData={weatherData} />
          <SunCard weatherData={weatherData} />

<Map weatherData={weatherData} />
        </>
        

      )}

      <footer className="footer">
        <p>© 2026 Skyline Weather Dashboard</p>

        <p className="footer-api">
          Powered by Open-Meteo API
        </p>

        <p className="footer-author">
          Developed by Shyla 
        </p>
      </footer>

    </div>
  );
}

export default App;