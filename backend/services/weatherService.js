const axios = require("axios");

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_URL =
  "https://air-quality-api.open-meteo.com/v1/air-quality";

/* ===========================
   Search by City
=========================== */

const getWeather = async (city) => {
  try {
    const geoResponse = await axios.get(GEO_URL, {
      params: {
        name: city,
        count: 1,
      },
    });

    if (
      !geoResponse.data.results ||
      geoResponse.data.results.length === 0
    ) {
      throw new Error("City not found");
    }

    const location = geoResponse.data.results[0];

    return await fetchWeatherData(
      location.latitude,
      location.longitude,
      location.name,
      location.country
    );

  }
  catch (error) {
  console.log("ERROR:");
  console.log(error.response?.data || error.message);

  throw error;
}
};

/* ===========================
   Search by Coordinates
=========================== */

const getWeatherByCoords = async (latitude, longitude) => {
  try {

    return await fetchWeatherData(
      latitude,
      longitude,
      "Your Location",
      ""
    );

  } 
  catch (error) {
  console.log("ERROR:");
  console.log(error.response?.data || error.message);

  throw error;
}
};

/* ===========================
   Common Weather Fetch
=========================== */

async function fetchWeatherData(
  latitude,
  longitude,
  city,
  country
) {

  // Weather API
  const weatherResponse = await axios.get(WEATHER_URL, {
    params: {
      latitude,
      longitude,

      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "weather_code",
        "wind_speed_10m",
        "surface_pressure",
        "is_day",
      ].join(","),

      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
      ].join(","),

      hourly: [
  "temperature_2m",
  "weather_code",
].join(","),

      timezone: "auto",
    },
  });

  // Air Quality API
  const airResponse = await axios.get(AIR_QUALITY_URL, {
    params: {
      latitude,
      longitude,

      current: [
        "european_aqi",
        "pm10",
        "pm2_5",
        "carbon_monoxide",
        "nitrogen_dioxide",
        "ozone",
      ].join(","),

      timezone: "auto",
    },
  });

  return {
    city,
    country,

    ...weatherResponse.data,

    airQuality: airResponse.data.current,
  };
}

module.exports = {
  getWeather,
  getWeatherByCoords,
};