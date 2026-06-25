import {
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiCloud,
  WiBarometer,
  WiDaySunny,
} from "react-icons/wi";
function getWeatherText(code) {
  if (code === 0) return "Clear Sky";
  if (code === 1) return "Mainly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 67) return "Drizzle";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain";
  if (code >= 95) return "Thunderstorm";

  return "Unknown";
}
function WeatherStats({ weatherData }) {
  if (!weatherData) {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><WiHumidity /></div>
          <h3>Humidity</h3>
          <p>68%</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><WiStrongWind /></div>
          <h3>Wind</h3>
          <p>12 km/h</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><WiThermometer /></div>
          <h3>Feels Like</h3>
          <p>31°</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><WiCloud /></div>
          <h3>Country</h3>
          <p>India</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><WiBarometer /></div>
          <h3>Pressure</h3>
          <p>--</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><WiDaySunny /></div>
          <h3>Weather</h3>
          <p>Clear</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: <WiHumidity />,
      title: "Humidity",
      value: `${weatherData.current.relative_humidity_2m}%`,
    },
    {
      icon: <WiStrongWind />,
      title: "Wind",
      value: `${weatherData.current.wind_speed_10m} km/h`,
    },
    {
      icon: <WiThermometer />,
      title: "Feels Like",
      value: `${Math.round(weatherData.current.apparent_temperature)}°`,
    },
    {
      icon: <WiCloud />,
      title: "Country",
      value: weatherData.country,
    },
    {
  icon: <WiBarometer />,
  title: "Pressure",
  value: "--",
},
    {
  icon: <WiDaySunny />,
  title: "Weather",
  value: getWeatherText(weatherData.current.weather_code),
},
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-icon">
            {item.icon}
          </div>

          <h3>{item.title}</h3>

          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherStats;