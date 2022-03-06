SELECT tag.tag_id, tag.vehicle_id, pass.time_stamp, pass.amount_charged
FROM tag, pass
WHERE tag.provider_name = 'aodos' and pass.station_id = 'EG01' and time_stamp>="2020-11-01" and time_stamp <= "2020-11-15"
ORDER BY pass.time_stamp;