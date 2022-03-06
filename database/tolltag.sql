create table vehicle(
    vehicle_id      VARCHAR(12) NOT NULL,
    licence_year    INT(4) NOT NULL,
    PRIMARY KEY(vehicle_id)
);

create table provider(
    provider_name   VARCHAR(20) NOT NULL,
    provider_abbr   VARCHAR(2) NOT NULL,
    PRIMARY KEY(provider_name)
);

create table station(
    station_id      VARCHAR(4) NOT NULL,
    station_name    VARCHAR(50) NOT NULL,
    PRIMARY KEY(station_id)
);

create table tag(
    tag_id          VARCHAR(9) NOT NULL,
    vehicle_id      VARCHAR(12) NOT NULL,
    provider_name   VARCHAR(20) NOT NULL,
    PRIMARY KEY(tag_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id),
    FOREIGN KEY(provider_name) REFERENCES provider(provider_name)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

create table owns(
    provider_name   VARCHAR(20) NOT NULL,
    station_id      VARCHAR(4) NOT NULL,
    PRIMARY KEY(provider_name,station_id),
    FOREIGN KEY(provider_name) REFERENCES provider(provider_name)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(station_id) REFERENCES station(station_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

create table pass(
    pass_id         VARCHAR(10) NOT NULL,
    vehicle_id      VARCHAR(12) NOT NULL,
    station_id      VARCHAR(4) NOT NULL,
    time_stamp      DATETIME NOT NULL,
    amount_charged  FLOAT(5) NOT NULL,
    PRIMARY KEY(pass_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(vehicle_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(station_id) REFERENCES station(station_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
