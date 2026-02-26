using {at.clouddna.Weather as db} from '../db/schema';

service SensorData {
    @readonly
    entity CustomerLocations as
        select
            *,
            location.temperature
        from db.OperatedIn;

    @readonly
    entity Location          as projection on db.Location;

    @readonly
    entity Customer          as projection on db.Customer;

    // Take the City as input and call the weather API to update the current temperature;
    action updateTemperature(city: String(20)) returns Decimal;
}
