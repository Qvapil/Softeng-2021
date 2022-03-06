USE tolltag;

DELETE from station where station_id = 'AO01';

INSERT into station(station_id, station_name) 
values ('AO01', 'aodos tolls station 01');

SELECT station_id from station where station_name = 'egnatia tolls station 10';