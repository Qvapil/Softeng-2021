SELECT vehicle.vehicle_id, vehicle.licence_year, provider.provider_name, tag.tag_id
FROM vehicle, tag, provider
WHERE provider_abbr = 'MR' and tag.provider_name = provider.provider_name and vehicle.vehicle_id = tag.vehicle_id 
