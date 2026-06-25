import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

function getWeatherIcon(code) {
  if (code === 0) return <WiDaySunny />;
  if (code === 1 || code === 2) return <WiDayCloudy />;
  if (code === 3) return <WiCloud />;
  if (code >= 51 && code <= 67) return <WiRain />;
  if (code >= 71 && code <= 77) return <WiSnow />;
  if (code >= 80 && code <= 82) return <WiRain />;
  if (code >= 95) return <WiThunderstorm />;

  return <WiDaySunny />;
}

function Forecast({ weatherData }) {

  if (!weatherData) {
    return (
      <section className="forecast-section">

        <h2 className="section-title">
          5-Day Forecast
        </h2>

        <div className="forecast-grid">

          <div className="forecast-card">
            <h3>Mon</h3>
            <div className="forecast-icon"><WiDaySunny /></div>
            <p>29°</p>
          </div>

          <div className="forecast-card">
            <h3>Tue</h3>
            <div className="forecast-icon"><WiDayCloudy /></div>
            <p>27°</p>
          </div>

          <div className="forecast-card">
            <h3>Wed</h3>
            <div className="forecast-icon"><WiRain /></div>
            <p>25°</p>
          </div>

          <div className="forecast-card">
            <h3>Thu</h3>
            <div className="forecast-icon"><WiDaySunny /></div>
            <p>30°</p>
          </div>

          <div className="forecast-card">
            <h3>Fri</h3>
            <div className="forecast-icon"><WiDayCloudy /></div>
            <p>28°</p>
          </div>

        </div>

      </section>
    );
  }

  const days = weatherData.daily.time.map((date, index) => ({
    day: new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    temp: Math.round(weatherData.daily.temperature_2m_max[index]),
    code: weatherData.daily.weather_code[index],
  }));

  return (
    <section className="forecast-section">

      <h2 className="section-title">
        5-Day Forecast
      </h2>

      <div className="forecast-grid">

        {days.slice(0, 5).map((item, index) => (

          <div className="forecast-card" key={index}>

            <h3>{item.day}</h3>

            <div className="forecast-icon">
              {getWeatherIcon(item.code)}
            </div>

            <p>{item.temp}°</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Forecast;