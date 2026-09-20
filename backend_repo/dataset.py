import pandas as pd
import numpy as np
import json
import os
import requests
from confluent_kafka import Consumer, KafkaError
from pytorch_forecasting import TimeSeriesDataSet, GroupNormalizer

def generate_mock_data_json(filepath="local_data.json", num_records=1000, num_facilities=5):
    """
    Generates mock local e-Aushadhi and HMIS data.
    """
    data = []
    
    terrains = ["hilly", "plain", "coastal"]
    facility_types = ["District Hospital", "CHC"]
    
    for facility_id in range(num_facilities):
        terrain = np.random.choice(terrains)
        facility_type = np.random.choice(facility_types)
        
        # Time steps
        for time_idx in range(num_records // num_facilities):
            data.append({
                "facility_id": str(facility_id),
                "time_idx": time_idx,
                "terrain": terrain, # Static covariate
                "facility_type": facility_type, # Static covariate
                "scheduled_drive": int(np.random.rand() > 0.9), # Known future (binary)
                "festival": int(np.random.rand() > 0.95), # Known future (binary)
                "molecule_consumption": float(np.random.poisson(20)), # Past observed
                "evin_temperature": float(np.random.normal(4.0, 1.5)), # Past observed
                "bed_occupancy": float(np.random.uniform(50, 150)), # Past observed
                "target_demand": float(np.random.poisson(25)) # Target to forecast
            })
            
    with open(filepath, "w") as f:
        json.dump(data, f)
    
    return filepath

def load_data_from_json(filepath):
    with open(filepath, "r") as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    
    # Ensure types
    df['facility_id'] = df['facility_id'].astype(str)
    df['terrain'] = df['terrain'].astype(str)
    df['facility_type'] = df['facility_type'].astype(str)
    df['time_idx'] = df['time_idx'].astype(int)
    
    # Target and known/past variables
    df['scheduled_drive'] = df['scheduled_drive'].astype(str) # category for TFT
    df['festival'] = df['festival'].astype(str)
    
    df['molecule_consumption'] = df['molecule_consumption'].astype(float)
    df['evin_temperature'] = df['evin_temperature'].astype(float)
    df['bed_occupancy'] = df['bed_occupancy'].astype(float)
    df['target_demand'] = df['target_demand'].astype(float)
    
    return df

def get_timeseries_dataset(df, max_encoder_length=30, max_prediction_length=14):
    training_cutoff = df["time_idx"].max() - max_prediction_length

    training_dataset = TimeSeriesDataSet(
        df[lambda x: x.time_idx <= training_cutoff],
        time_idx="time_idx",
        target="target_demand",
        group_ids=["facility_id"],
        min_encoder_length=max_encoder_length // 2, 
        max_encoder_length=max_encoder_length,
        min_prediction_length=1,
        max_prediction_length=max_prediction_length,
        static_categoricals=["terrain", "facility_type"],
        time_varying_known_categoricals=["scheduled_drive", "festival"],
        time_varying_unknown_reals=["molecule_consumption", "evin_temperature", "bed_occupancy", "target_demand"],
        target_normalizer=GroupNormalizer(
            groups=["facility_id"], transformation="softplus"
        ), 
        add_relative_time_idx=True,
        add_target_scales=True,
        add_encoder_length=True,
    )
    
    validation_dataset = TimeSeriesDataSet.from_dataset(
        training_dataset, df, predict=True, stop_randomization=True
    )
    
    return training_dataset, validation_dataset

def fetch_telemetry(timeout=2.0):
    conf = {
        'bootstrap.servers': os.getenv("KAFKA_BROKER", "localhost:9092"),
        'group.id': 'client-forecaster-group',
        'auto.offset.reset': 'earliest'
    }
    
    try:
        consumer = Consumer(conf)
        consumer.subscribe(['evin-telemetry'])
        
        telemetry_data = {}
        msg = consumer.poll(timeout=timeout)
        if msg is not None and not msg.error():
            data = json.loads(msg.value().decode('utf-8'))
            telemetry_data[data["facility_id"]] = data["temperature_celsius"]
            
        consumer.close()
        return telemetry_data
    except Exception as e:
        print(f"Failed to fetch Kafka telemetry: {e}")
        return {}

def generate_data_from_api(filepath="local_data.json", num_records=1000, num_facilities=5):
    """
    Connects to the backend APIs to seed the data generation process for the TFT model.
    """
    api_url = os.getenv("BACKEND_API_URL", "http://localhost:8000")
    
    data = []
    terrains = ["hilly", "plain", "coastal"]
    facility_types = ["District Hospital", "CHC"]
    
    # Try fetching real-time telemetry from Kafka
    telemetry_data = fetch_telemetry()
    
    for facility_id in range(num_facilities):
        fac_str = f"PHC_0{facility_id + 1}"
        
        # Default seeds
        base_molecule = 20.0
        base_footfall = 100.0
        
        # Try fetching from API
        try:
            hmis_res = requests.get(f"{api_url}/api/e-sushrut/hmis?facility_id={fac_str}", timeout=2)
            if hmis_res.status_code == 200 and hmis_res.json():
                # Use the latest clinical footfall to seed bed occupancy
                obs = hmis_res.json()
                base_footfall = obs[0].get("valueInteger", 100.0)
                
            inv_res = requests.get(f"{api_url}/api/e-aushadhi/inventory-report?facility_id={fac_str}", timeout=2)
            if inv_res.status_code == 200 and inv_res.json().get("inventoryListing"):
                # Use inventory snapshot to seed molecule consumption
                listings = inv_res.json().get("inventoryListing", [])
                if listings and listings[0].get("items"):
                    base_molecule = float(listings[0]["items"][0]["quantity"]["value"]) / 10.0 # Just a proxy
        except Exception as e:
            pass # Fallback to default if API fails
            
        terrain = np.random.choice(terrains)
        facility_type = np.random.choice(facility_types)
        
        base_temp = telemetry_data.get(fac_str, 4.0)
        
        # Time steps
        for time_idx in range(num_records // num_facilities):
            data.append({
                "facility_id": str(facility_id),
                "time_idx": time_idx,
                "terrain": terrain,
                "facility_type": facility_type,
                "scheduled_drive": int(np.random.rand() > 0.9),
                "festival": int(np.random.rand() > 0.95),
                "molecule_consumption": float(np.random.poisson(base_molecule)),
                "evin_temperature": float(np.random.normal(base_temp, 1.0)),
                "bed_occupancy": float(np.random.uniform(base_footfall * 0.5, base_footfall * 1.5)),
                "target_demand": float(np.random.poisson(base_molecule * 1.2))
            })
            
    with open(filepath, "w") as f:
        json.dump(data, f)
    
    return filepath
