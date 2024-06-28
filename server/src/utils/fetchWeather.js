require('dotenv').config();
const axios = require('axios');

const rainCodes = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246];
const snowCodes = [1066, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];

const fetchWeather = async city => {
    try {
        const { data } = await axios.get('http://api.weatherapi.com/v1/current.json?key=bd64f7fdc02741b2b75182535242606&q=' + city);
        const code = data.current.condition.code;
        return rainCodes.includes(code) || snowCodes.includes(code);
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

module.exports = { fetchWeather };
