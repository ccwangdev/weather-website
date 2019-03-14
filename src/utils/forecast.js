const request = require("request");

const forecast = (latitude, longtitude, callback) => {
    let url = `https://api.darksky.net/forecast/6d9d536e446929f0134bee994c0410d0/${latitude},${longtitude}`;

    request({
        url: url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service.");
        } else if (body.error) {
            callback("Unable to find location. Try another one");
        } else {
            let {summary, temperature, precipProbability} = body.currently;
            callback(undefined, `${summary}. It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
        }
    })
};

module.exports = forecast;