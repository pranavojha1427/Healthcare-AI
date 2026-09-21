import os
import random
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime

app = FastAPI(title="Healthcare API Emulators")

# Enable CORS for the frontend dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CSV_PATH = "ml_model/india_phc_supply_chain_dataset.csv"
df = None

@app.on_event("startup")
def load_data():
    global df
    if os.path.exists(CSV_PATH):
        df = pd.read_csv(CSV_PATH)
        print(f"Loaded {len(df)} rows from dataset.")
    else:
        print("Dataset not found!")

@app.get("/api/facilities")
async def get_facilities():
    if df is not None:
        phcs = df['phc_id'].unique().tolist()
        return {"facilities": phcs}
    return {"facilities": ["PHC_001"]}

@app.get("/api/e-aushadhi/inventory-report")
async def get_inventory_report(facility_id: str):
    if df is None:
        return {"error": "Dataset not loaded"}
    
    phc_data = df[df['phc_id'] == facility_id]
    if phc_data.empty:
        facility_id = random.choice(df['phc_id'].unique())
        phc_data = df[df['phc_id'] == facility_id]
        
    latest_records = phc_data.tail(5).to_dict(orient="records")
    
    inventory_listing = []
    for rec in latest_records:
        inventory_listing.append({
            "items": [
                {
                    "item": {
                        "reference": str(rec["medicine_name"]),
                        "display": str(rec["medicine_name"])
                    },
                    "quantity": {
                        "value": int(rec["stock_on_hand"]),
                        "daily_consumption": int(rec["daily_consumption_rate"])
                    }
                }
            ]
        })

    return {
        "resourceType": "InventoryReport",
        "status": "active",
        "facility_id": facility_id,
        "inventoryListing": inventory_listing
    }

@app.get("/api/e-aushadhi/supply-delivery")
async def get_supply_delivery(facility_id: str):
    return []

@app.get("/api/e-sushrut/hmis")
async def get_hmis_data(facility_id: str):
    if df is None:
        return []
        
    phc_data = df[df['phc_id'] == facility_id]
    if phc_data.empty:
        phc_data = df[df['phc_id'] == random.choice(df['phc_id'].unique())]
        
    latest_records = phc_data.tail(10).to_dict(orient="records")
    
    observations = []
    for rec in latest_records:
        observations.append({
            "resourceType": "Observation",
            "status": "final",
            "code": {
                "text": "Clinical Footfall"
            },
            "subject": {
                "reference": f"Location/{facility_id}"
            },
            "valueInteger": int(rec["patient_footfall"]),
            "weather": str(rec["weather_condition"]),
            "festival": str(rec["local_festival"]),
            "effectiveDateTime": str(rec["date"])
        })
    return observations

@app.get("/api/ews/predictions")
async def get_ews_predictions(facility_id: str):
    if df is None:
        return {"error": "Dataset not loaded"}
        
    phc_data = df[df['phc_id'] == facility_id]
    if phc_data.empty:
        phc_data = df[df['phc_id'] == random.choice(df['phc_id'].unique())]
        
    phc_data_sorted = phc_data.sort_values(by="predicted_days_to_stockout")
    critical_rec = phc_data_sorted.iloc[0]
    
    days_to_depletion = float(critical_rec["predicted_days_to_stockout"])
    confidence = round(random.uniform(92.0, 99.0), 1)
    
    return {
        "facility_id": facility_id,
        "prediction": {
            "critical_item": str(critical_rec["medicine_name"]),
            "estimated_depletion_days": days_to_depletion,
            "stock_on_hand": int(critical_rec["stock_on_hand"]),
            "daily_consumption": int(critical_rec["daily_consumption_rate"]),
            "confidence_interval_percent": confidence,
            "status": "CRITICAL" if int(critical_rec["critical_deficit_flag"]) == 1 else "STABLE",
            "nearest_hub_surplus": int(critical_rec["nearest_hub_surplus"]),
            "hub_distance_km": float(critical_rec["hub_distance_km"])
        },
        "forecast_horizon_days": 14
    }
