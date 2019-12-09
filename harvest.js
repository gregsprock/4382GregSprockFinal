const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./app_api/models/vatsim');
const Weather = mongoose.model('Weather');

let apikey = process.env.DARKSKY_API_KEY;
let url = "https://api.darksky.net/forecast/"
url += apikey + "/";

const getWeather = (url, city) => {

    console.log(url);
    console.log(city);

    axios.get(url)
        .then((response) => {

            var report = {
                city: city,
                time: response.data.currently.time,
                summary: response.data.currently.summary,
                rain: response.data.currently.precipProbability,
                temp: response.data.currently.temperature,
                wind: response.data.currently.windSpeed
            }

            //pull connection string from environment variable
            const uri = process.env.MONGODB_ATLAS_URL;

            //this example uses ES6 template literals for string interpolation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
                .catch(err => console.log(err));

            var promise = Weather.create(report, function (err, small) {
                if (err) return handleError(err);
                // saved!
            });

        })
        .catch((error) => {
            console.log(error);
        });
}

const task = cron.schedule('* * * * *', () => {

    var cities = [

        {
            city: "Amarillo",
            lat: 35.2220,
            long: 101.8313
        },

        {
            city: "Lubbock",
            lat: 33.5779,
            long: 101.8552
        },

        {
            city: "Midland",
            lat: 31.9973,
            long: 102.0779
        },
        {
            city: "Abilene",
            lat: 32.4487,
            long: 99.7331
        },
        {
            city: "San Angelo",
            lat: 31.4638,
            long: 100.4370
        }
    ];

    cities.forEach((city) => {
        //    '/67b3375b98fa3c40640f73e3f7142865/35.2220,101.8313'
        let url_to_send = url + city.lat + "," + city.long;
        getWeather(url_to_send, city.city);
    });

}, {
    scheduled: false
}
);

module.exports = task;