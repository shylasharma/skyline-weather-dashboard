const weatherService = require("../services/weatherService");

// Search by city
const getWeather = async (req, res) => {

  try {

    const { city } = req.query;

    const data = await weatherService.getWeather(city);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// Search by coordinates
const getWeatherByCoords = async (req, res) => {

  try {

    const { latitude, longitude } = req.query;

    const data = await weatherService.getWeatherByCoords(
      latitude,
      longitude
    );

    res.json(data);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  getWeather,
  getWeatherByCoords,
};