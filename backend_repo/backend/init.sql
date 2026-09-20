CREATE TABLE e_aushadhi_stock (
    id SERIAL PRIMARY KEY,
    facility_id VARCHAR(50) NOT NULL,
    item_reference VARCHAR(100) NOT NULL,
    item_display VARCHAR(200) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    procurement_date TIMESTAMP NOT NULL,
    expiry_date TIMESTAMP
);

CREATE TABLE e_sushrut_hmis (
    id SERIAL PRIMARY KEY,
    facility_id VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    clinical_footfall INTEGER NOT NULL,
    personnel_present INTEGER NOT NULL,
    personnel_total INTEGER NOT NULL
);

CREATE TABLE evin_telemetry (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) NOT NULL,
    facility_id VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    temperature_celsius NUMERIC(5, 2) NOT NULL,
    status VARCHAR(50)
);
