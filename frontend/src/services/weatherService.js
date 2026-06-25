import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/* ===========================
   Search Cities (Autocomplete)
   (Still uses Open-Meteo directly)
=========================== */

export const searchCities = async (query) => {
  try {
    if (!query || query.trim().length < 2) return [];

    const response = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: query,
          count: 10,
          language: "en",
          format: "json",
        },
      }
    );

    const cities = response.data.results || [];

    cities.sort((a, b) => {
      const scoreA =
        (a.population || 0) +
        (a.feature_code === "PPLC" ? 1000000000 : 0) +
        (a.feature_code === "PPLA" ? 500000000 : 0);

      const scoreB =
        (b.population || 0) +
        (b.feature_code === "PPLC" ? 1000000000 : 0) +
        (b.feature_code === "PPLA" ? 500000000 : 0);

      return scoreB - scoreA;
    });

    return cities;

  } catch (error) {
    console.log(error);
    return [];
  }
};

/* ===========================
   Search Weather by City
=========================== */

export const getWeather = async (city) => {
  try {

    const response = await axios.get(API_URL, {
      params: {
        city,
      },
    });

    return response.data;

  } catch (error) {

    console.log(error);

    return null;

  }
};

/* ===========================
   Current Location Weather
=========================== */

export const getWeatherByCoords = async (
  latitude,
  longitude
) => {

  try {

    const response = await axios.get(
      `${API_URL}/coords`,
      {
        params: {
          latitude,
          longitude,
        },
      }
    );

    return response.data;

  } catch (error) {

    console.log(error);

    return null;

  }

};