import {
  WiStrongWind,
  WiDust,
  WiCloud,
} from "react-icons/wi";

function getAQIStatus(aqi) {
  if (aqi <= 20) return { text: "Excellent", color: "#2ecc71" };
  if (aqi <= 40) return { text: "Good", color: "#27ae60" };
  if (aqi <= 60) return { text: "Moderate", color: "#f1c40f" };
  if (aqi <= 100) return { text: "Poor", color: "#e67e22" };
  if (aqi <= 150) return { text: "Very Poor", color: "#e74c3c" };

  return { text: "Hazardous", color: "#8e44ad" };
}

function AirQuality({ weatherData }) {

  // Placeholder before search
  if (!weatherData || !weatherData.airQuality) {
    return (
      <section className="air-quality">

        <h2 className="section-title">Air Quality</h2>

        <div className="air-card">

          <WiStrongWind className="air-icon" />

          <h1>48</h1>

          <p>AQI</p>

          <h3 style={{ color: "#40bfff" }}>
            Good Air Quality
          </h3>

        </div>

      </section>
    );
  }

  const air = weatherData.airQuality;
  const status = getAQIStatus(air.european_aqi);

  return (
    <section className="air-quality">

      <h2 className="section-title">
        Air Quality
      </h2>

      <div className="air-card">

        <WiStrongWind className="air-icon" />

        <h1>{Math.round(air.european_aqi)}</h1>

        <p>AQI</p>

        <h3
          style={{
            color: status.color,
            marginBottom: "25px",
          }}
        >
          {status.text}
        </h3>

        <div className="air-details">

          <div className="air-item">
            <WiDust />
            <span>PM2.5</span>
            <strong>{air.pm2_5}</strong>
          </div>

          <div className="air-item">
            <WiDust />
            <span>PM10</span>
            <strong>{air.pm10}</strong>
          </div>

          <div className="air-item">
            <WiCloud />
            <span>Ozone</span>
            <strong>{air.ozone}</strong>
          </div>

          <div className="air-item">
            <WiCloud />
            <span>NO₂</span>
            <strong>{air.nitrogen_dioxide}</strong>
          </div>

          <div className="air-item">
            <WiStrongWind />
            <span>CO</span>
            <strong>{air.carbon_monoxide}</strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default AirQuality;