function Map({ weatherData }) {

  const latitude = weatherData?.latitude || 28.6139;
  const longitude = weatherData?.longitude || 77.2090;

  const bbox = `${longitude - 0.08},${latitude - 0.08},${longitude + 0.08},${latitude + 0.08}`;

  return (
    <section className="map-section">

      <h2 className="section-title">
        Live Weather Map
      </h2>

      <div className="map-card">

        <iframe
          title="Map"
          width="100%"
          height="420"
          loading="lazy"
          style={{
            border: 0,
            borderRadius: "18px",
          }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${latitude},${longitude}`}
        />

      </div>

    </section>
  );
}

export default Map;