const cds = require('@sap/cds');

module.exports = cds.service.impl(function () {
    const { Location } = this.entities;

    this.on('updateTemperature', async (req) => {
        const { city } = req.data;

        const loc = await SELECT.one
            .from(Location)
            .columns(
                'coordinates_latitude as latitude',
                'coordinates_longitude as longitude'
            )
            .where({ city });

        if (!loc) {
            req.error(404, `City not found: ${city}`);
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey) {
            req.error(500, 'OPENWEATHER_API_KEY is not configured');
        }

        const weatherAPI = await cds.connect.to('weatherservice');
        const res = await weatherAPI.tx(req).get(
            `/data/2.5/weather?units=metric&appid=${apiKey}&lat=${loc.latitude}&lon=${loc.longitude}`
        );

        await UPDATE(Location)
            .set({ temperature: res.main.temp })
            .where({ city });

        return res.main.temp;
    });
});