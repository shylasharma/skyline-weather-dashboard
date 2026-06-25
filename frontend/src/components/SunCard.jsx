import { WiSunrise, WiSunset } from "react-icons/wi";

function formatTime(time) {
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDayLength(sunrise, sunset) {
  const rise = new Date(sunrise);
  const set = new Date(sunset);

  const diff = set - rise;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
}

function SunCard({ weatherData }) {

  // Placeholder before search
  if (!weatherData) {
    return (
      <section className="sun-section">

        <h2 className="section-title">
          Sunrise & Sunset
        </h2>

        <div className="sun-card">

          <div className="sun-box">
            <WiSunrise className="sun-icon sunrise" />
            <h3>Sunrise</h3>
            <p>05:42 AM</p>
          </div>

          <div className="divider"></div>

          <div className="sun-box">
            <WiSunset className="sun-icon sunset" />
            <h3>Sunset</h3>
            <p>06:51 PM</p>
          </div>

          <div className="divider"></div>

          <div className="sun-box">
            <h3>Day Length</h3>
            <p>13h 09m</p>
          </div>

        </div>

      </section>
    );
  }

  const sunrise = weatherData.daily.sunrise[0];
  const sunset = weatherData.daily.sunset[0];

  return (
    <section className="sun-section">

      <h2 className="section-title">
        Sunrise & Sunset
      </h2>

      <div className="sun-card">

        <div className="sun-box">
          <WiSunrise className="sun-icon sunrise" />

          <h3>Sunrise</h3>

          <p>{formatTime(sunrise)}</p>
        </div>

        <div className="divider"></div>

        <div className="sun-box">
          <WiSunset className="sun-icon sunset" />

          <h3>Sunset</h3>

          <p>{formatTime(sunset)}</p>
        </div>

        <div className="divider"></div>

        <div className="sun-box">

          <h3>Day Length</h3>

          <p>{getDayLength(sunrise, sunset)}</p>

        </div>

      </div>

    </section>
  );
}

export default SunCard;