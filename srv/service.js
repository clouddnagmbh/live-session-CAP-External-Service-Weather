import cds from '@sap/cds';

export class SensorData extends cds.ApplicationService {
    init() {
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
            const path = `/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m`;

            // Open-Meteo's free API sometimes answers 503 "overloaded" – retry once
            const res = await weatherAPI.tx(req).get(path).catch((err) => {
                if (err.reason?.response?.status !== 503) throw err;
                return weatherAPI.tx(req).get(path);
            });

            await UPDATE(Location)
                .set({ temperature: res.current.temperature_2m })
                .where({ city });

            return res.current.temperature_2m;
        });

        return super.init();
    }
}
