namespace at.clouddna.Weather;

type Coordinates : {
    longitude : Decimal(9, 6);
    latitude  : Decimal(9, 6);
}

entity Customer {
    key name : String(20);
}

entity Location {
    key city        : String(20);
        coordinates : Coordinates;
        temperature : Decimal;
        temp_unit   : String(2);
}

entity OperatedIn {
    key customer : Association to one Customer not null;
        location : Association to one Location not null;
}
