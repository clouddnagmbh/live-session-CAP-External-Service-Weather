using { cuid, managed } from '@sap/cds/common';

namespace at.clouddna.Weather;

type Coordinates {
    longitude : Decimal(9, 6);
    latitude  : Decimal(9, 6);
}

entity Customers : cuid, managed {
    name     : String(100) @mandatory;
    location : Association to Locations;
}

entity Locations : cuid, managed {
    city        : String(50) @mandatory;
    coordinates : Coordinates;
    temperature : Decimal(4, 1);
    unit        : String(1) default 'C';
    customers   : Association to many Customers
                      on customers.location = $self;
}
