USE tolltag;
DELETE from pass where pass_id = 'ACU9233593';

INSERT into pass(pass_id, vehicle_id, station_id, time_stamp, amount_charged) 
values ('PYOL675769','ED51EWW52190','KO01','2021-06-17 18:52:00','2.8');

SELECT pass_id, vehicle_id, station.station_name, time_stamp, amount_charged
from pass, station 
where station.station_id = pass.station_id and pass.station_id = 'OO05';