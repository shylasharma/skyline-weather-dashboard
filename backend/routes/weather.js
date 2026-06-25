const express = require("express");

const router = express.Router();

const {
  getWeather,
  getWeatherByCoords,
} = require("../controllers/weatherController");

// Search by city
router.get("/", getWeather);

// Search by coordinates
router.get("/coords", getWeatherByCoords);

module.exports = router;