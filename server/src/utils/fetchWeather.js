require('dotenv').config();
const axios = require('axios');

const URL = process.env.API_URL;

const fetchWeather = async city => {
  try {
    const { data } = await axios.get(`${URL}?q=${city}&appid=${process.env.API_KEY}&units=metric`);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { fetchWeather };
