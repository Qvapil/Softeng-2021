use tolltag;

DELETE from provider where provider_name = 'kentriki_odos';

INSERT into provider(provider_name, provider_abbr)
values('kentriki_odos', 'KO');

SELECT provider_abbr from provider where provider_name = 'moreas';