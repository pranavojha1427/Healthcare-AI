
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
