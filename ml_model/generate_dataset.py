import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

def generate_dataset(num_records=15000):
    states = ["Maharashtra", "Uttar Pradesh", "Bihar", "Karnataka", "Tamil Nadu", "Assam", "Rajasthan", "Gujarat"]
    
    # 50 PHCs across India
    phcs = [f"PHC_{str(i).zfill(3)}" for i in range(1, 51)]
    phc_state_map = {phc: random.choice(states) for phc in phcs}
    
    medicines = [
        "Amoxicillin 500mg (Antibiotic)", 
        "Paracetamol 500mg (Antipyretic)", 
        "Rabies Immunoglobulin (ARV)", 
        "Oxytocin 10 IU (Maternal)", 
        "Ceftriaxone 1g (Antibiotic)",
        "ORS Packets",
        "Snake Venom Antiserum"
    ]
    
    weather_conditions = ["Clear", "Monsoon/Heavy Rain", "Heatwave", "High Humidity"]
    
    festivals = ["None", "Diwali", "Holi", "Kumbh Mela", "Local Fair"]
    
    data = []
    
    start_date = datetime(2023, 1, 1)
    
    print("Generating PHC telemetry data...")
    for _ in range(num_records):
        phc = random.choice(phcs)
        state = phc_state_map[phc]
        medicine = random.choice(medicines)
        
        # Random date within 1 year
        record_date = start_date + timedelta(days=random.randint(0, 365))
        
        weather = random.choice(weather_conditions)
        temp_c = round(random.uniform(22.0, 45.0), 1)
        festival = random.choice(festivals)
        
        # Logic for patient footfall
        base_footfall = random.randint(30, 150)
        if weather == "Monsoon/Heavy Rain":
            base_footfall += random.randint(20, 80) # Vector-borne diseases
        if festival != "None":
            base_footfall += random.randint(10, 50)
            
        daily_consumption = max(1, int(base_footfall * random.uniform(0.1, 0.4)))
        
        # Current stock
        stock_on_hand = random.randint(0, 500)
        
        # Is deficit?
        days_to_stockout = stock_on_hand / daily_consumption if daily_consumption > 0 else 999
        is_deficit = days_to_stockout < 5
        
        # Lateral Transfer feasibility
        nearest_hub_surplus = random.randint(0, 1000)
        distance_km = round(random.uniform(10.0, 80.0), 1)
        
        data.append({
            "date": record_date.strftime("%Y-%m-%d"),
            "phc_id": phc,
            "state": state,
            "medicine_name": medicine,
            "weather_condition": weather,
            "temperature_c": temp_c,
            "local_festival": festival,
            "patient_footfall": base_footfall,
            "daily_consumption_rate": daily_consumption,
            "stock_on_hand": stock_on_hand,
            "predicted_days_to_stockout": round(days_to_stockout, 1),
            "critical_deficit_flag": int(is_deficit),
            "nearest_hub_surplus": nearest_hub_surplus,
            "hub_distance_km": distance_km
        })
        
    df = pd.DataFrame(data)
    df = df.sort_values(by=["date", "phc_id"])
    
    os.makedirs("ml_model", exist_ok=True)
    csv_path = "ml_model/india_phc_supply_chain_dataset.csv"
    df.to_csv(csv_path, index=False)
    print(f"Dataset successfully created with {len(df)} rows at {csv_path}!")

if __name__ == "__main__":
    generate_dataset()
