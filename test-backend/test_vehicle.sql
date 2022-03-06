use tolltag;

INSERT into vehicle(vehicle_id, licence_year)
values ('AT19HLV57174', 2020);

SELECT vehicle_id from vehicle where licence_year = '2020';