import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
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

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return "🌅 Good Morning";
  if (hour >= 12 && hour < 17) return "☀️ Good Afternoon";
  if (hour >= 17 && hour < 20) return "🌇 Good Evening";
  return "🌙 Good Night";
}

function getWeatherIcon(code, isDay) {

  if (code === 0)
    return isDay
      ? <WiDaySunny className="weather-icon" />
      : <WiNightClear className="weather-icon" />;

  if (code === 1 || code === 2)
    return isDay
      ? <WiDayCloudy className="weather-icon" />
      : <WiNightAltCloudy className="weather-icon" />;

  if (code === 3)
    return <WiCloud className="weather-icon" />;

  if (code >= 45 && code <= 48)
    return <WiFog className="weather-icon" />;

  if (code >= 51 && code <= 67)
    return <WiRain className="weather-icon" />;

  if (code >= 71 && code <= 77)
    return <WiSnow className="weather-icon" />;

  if (code >= 80 && code <= 82)
    return <WiRain className="weather-icon" />;

  if (code >= 95)
    return <WiThunderstorm className="weather-icon" />;

  return isDay
    ? <WiDaySunny className="weather-icon" />
    : <WiNightClear className="weather-icon" />;
}

function WeatherCard({ weatherData }) {

  if (!weatherData) {
    return (
      <div className="weather-card">

        <div className="weather-left">

          <p className="small-text">🌤 Welcome</p>

          <h2>Search a City</h2>

          <p className="condition">
            Live Weather Dashboard
          </p>

          <h1 className="temperature">--°</h1>

        </div>

        <div className="weather-right">

          <WiDaySunny className="weather-icon" />

          <p className="feels">Feels Like</p>

          <h3 className="feels-temp">--°</h3>

        </div>

      </div>
    );
  }

  const hour = new Date(weatherData.current.time).getHours();

  return (
    <div className="weather-card">

      <div className="weather-left">

        <p className="small-text">
          {getGreeting(hour)}
        </p>

        <h2>
          {weatherData.city}
        </h2>

        <p className="condition">
          {getWeatherText(weatherData.current.weather_code)}
        </p>

        <h1 className="temperature">
          {Math.round(weatherData.current.temperature_2m)}°
        </h1>

      </div>

      <div className="weather-right">

        {getWeatherIcon(
          weatherData.current.weather_code,
          weatherData.current.is_day
        )}

        <p className="feels">
          Feels Like
        </p>

        <h3 className="feels-temp">
          {Math.round(weatherData.current.apparent_temperature)}°
        </h3>

      </div>

    </div>
  );
}

export default WeatherCard;