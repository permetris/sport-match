require('dotenv').config();
const axios = require('axios');

const URL = process.env.API_URL;

const fetchWeather = async city => {
    try {
        console.log('first');
        console.log(URL);
        // const { data } = await axios.get(`${URL}?q=${city}&appid=${process.env.API_KEY}&units=metric`);
        const { data } = await
        axios.get('http://api.weatherapi.com/v1/current.json?key=bd64f7fdc02741b2b75182535242606&q=Zagreb');
        console.log(data.current.condition);
        console.log(data.current.condition.text.includes('rain') || data.current.condition.text.includes('rain'));
        return data;
    } catch (err) {
        console.log(err.message);
        return 
    }
};

fetchWeather('Split');
