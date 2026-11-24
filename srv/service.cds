using { at.clouddna.Weather as db } from '../db/schema';

service SensorData {
    @readonly
    entity CustomerLocations as
        projection on db.Customers {
            ID,
            name,
            location,
            location.city,
            location.temperature,
            location.unit
        };

    @readonly
    entity Locations         as projection on db.Locations;

    // Take the city as input and call the weather API to update the current temperature
    action updateTemperature(city : String(50)) returns Decimal(4, 1);
}
