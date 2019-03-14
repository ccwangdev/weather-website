const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY2N3YW5nZGV2IiwiYSI6ImNqc3k0czQ3dzA5MG40OXBhbXM5ZXlqN2gifQ.VHLcP9ANV2MNmQis_2aFyg&limit=1`;

    request({
        url,
        json: true
    }, (error, { body }) => {
        console.log(body);
        if (error) {
            callback("Unable to connect to location services!");
        } else if (!body.features || !body.features.length) {
            callback("Unable to find location. Try another search.");
        } else {
            let feature = body.features[0];
            let latitude = feature.geometry.coordinates[1];
            let longitude = feature.geometry.coordinates[0];
            let location = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
};

module.exports = geocode;