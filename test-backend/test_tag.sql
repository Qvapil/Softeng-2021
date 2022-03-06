use tolltag;

DELETE from tag where provider_name = 'nea_odos';

INSERT into tag(tag_id, vehicle_id, provider_name)
values ('NE91T5474', 'EG95RTB75032', 'nea_odos');

SELECT tag_id, vehicle_id from tag where provider_name = 'olympia_odos';