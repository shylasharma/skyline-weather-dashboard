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

function getWeatherIcon(code, hour) {
  const isDay = hour >= 6 && hour < 18;

  if (code === 0)
    return isDay ? <WiDaySunny /> : <WiNightClear />;

  if (code === 1 || code === 2)
    return isDay ? <WiDayCloudy /> : <WiNightAltCloudy />;

  if (code === 3)
    return <WiCloud />;

  if (code >= 45 && code <= 48)
    return <WiFog />;

  if (code >= 51 && code <= 67)
    return <WiRain />;

  if (code >= 71 && code <= 77)
    return <WiSnow />;

  if (code >= 80 && code <= 82)
    return <WiRain />;

  if (code >= 95)
    return <WiThunderstorm />;

  return isDay ? <WiDaySunny /> : <WiNightClear />;
}

function HourlyForecast({ weatherData }) {
  // Placeholder before search
  if (!weatherData) {
    const hours = [
      { time: "10 AM", temp: "29°", code: 0, hour: 10 },
      { time: "11 AM", temp: "30°", code: 1, hour: 11 },
      { time: "12 PM", temp: "31°", code: 0, hour: 12 },
      { time: "1 PM", temp: "30°", code: 2, hour: 13 },
      { time: "2 PM", temp: "28°", code: 80, hour: 14 },
      { time: "3 PM", temp: "27°", code: 95, hour: 15 },
    ];

    return (
      <section className="hourly-section">

        <h2 className="section-title">
          Next 6 Hours
        </h2>

        <div className="hourly-grid">

          {hours.map((hour, index) => (
            <div className="hour-card" key={index}>

              <h4>{hour.time}</h4>

              <div className="hour-icon">
                {getWeatherIcon(hour.code, hour.hour)}
              </div>

              <p>{hour.temp}</p>

            </div>
          ))}

        </div>

      </section>
    );
  }

  // Current hour of searched city
  const currentHour = new Date(weatherData.current.time).getHours();

  // Find matching hour
  let startIndex = weatherData.hourly.time.findIndex((time) => {
    return new Date(time).getHours() === currentHour;
  });

  // Fallback
  if (startIndex === -1) startIndex = 0;

  // Next 6 hours
  const hours = [];

  for (
    let i = startIndex;
    i < Math.min(startIndex + 6, weatherData.hourly.time.length);
    i++
  ) {
    const date = new Date(weatherData.hourly.time[i]);

    hours.push({
      time: date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      hour: date.getHours(),
      temp: Math.round(weatherData.hourly.temperature_2m[i]),
      code: weatherData.hourly.weather_code[i],
    });
  }

  return (
    <section className="hourly-section">

      <h2 className="section-title">
        Next 6 Hours
      </h2>

      <div className="hourly-grid">

        {hours.map((hour, index) => (
          <div className="hour-card" key={index}>

            <h4>{hour.time}</h4>

            <div className="hour-icon">
              {getWeatherIcon(hour.code, hour.hour)}
            </div>

            <p>{hour.temp}°</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default HourlyForecast;