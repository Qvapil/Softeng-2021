SELECT station.station_name as Station, "01-01-2021" as DateFrom, "15-01-2021" as DateTo, count(pass.pass_id) as TotalPasses
FROM station, owns, pass
WHERE station.station_id = owns.station_id and owns.provider_name = "egnatia" and owns.station_id = pass.station_id and time_stamp>="2021-01-01" and time_stamp<="2021-01-15"
GROUP BY pass.station_id;