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

        if (!loc) return req.reject(404, `City not found: ${city}`);

        const weatherAPI = await cds.connect.to('weatherservice');
        const res = await weatherAPI.tx(req).get(
            `/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m`
        );

        await UPDATE(Location)
            .set({ temperature: res.current.temperature_2m })
            .where({ city });

        return res.current.temperature_2m;
    });
});
