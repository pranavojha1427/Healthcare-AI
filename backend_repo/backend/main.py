import os
import random
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import math
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


class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/auth/login")
async def login(req: LoginRequest):
    if req.username == "cho":
        return {"token": "fake-jwt-token-cho", "role": "CHO", "facility_id": "PHC_001"}
    elif req.username == "manager":
        return {"token": "fake-jwt-token-manager", "role": "MANAGER", "zone": "Zone Alpha-4"}
    return {"error": "Invalid credentials"}

@app.get("/api/federated/metrics")
async def get_federated_metrics():
    return {
        "status": "active",
        "current_round": 412,
        "fedbuff_capacity": "84%",
        "updates_received": 142,
        "dp_budget_epsilon": round(random.uniform(0.7, 0.95), 3),
        "dp_budget_delta": "1e-5",
        "convergence_rate": "99.4%"
    }

@app.get("/api/ews/historical-forecast")
async def get_historical_forecast(facility_id: str, medicine: str = "Paracetamol"):
    # Generate 14 days of historical data and 14 days of forecast
    data = []
    base_val = random.randint(20, 100)
    
    # 14 days history
    for i in range(14, 0, -1):
        date_str = (datetime.now() - pd.Timedelta(days=i)).strftime("%Y-%m-%d")
        data.append({
            "date": date_str,
            "type": "Historical",
            "actual_consumption": int(base_val + random.randint(-10, 15) + (10 * math.sin(i))),
            "forecasted_demand": None,
            "ci_lower": None,
            "ci_upper": None
        })
        
    # 14 days forecast
    for i in range(0, 14):
        date_str = (datetime.now() + pd.Timedelta(days=i)).strftime("%Y-%m-%d")
        forecast = int(base_val + random.randint(-5, 20) + (10 * math.sin(i + 14)))
        data.append({
            "date": date_str,
            "type": "Forecast",
            "actual_consumption": None,
            "forecasted_demand": forecast,
            "ci_lower": int(forecast * 0.85),
            "ci_upper": int(forecast * 1.15)
        })
        
    return {"facility_id": facility_id, "medicine": medicine, "timeseries": data}

@app.get("/api/locations")
async def get_locations():
    # Return lat/lon for the Map
    if df is None:
        return []
    
    # Generate mock coordinates around Maharashtra (Pune/Indapur region)
    # roughly 18.5204 N, 73.8567 E
    facilities = df['phc_id'].unique().tolist()
    locs = []
    for f in facilities:
        phc_data = df[df['phc_id'] == f]
        critical_rec = phc_data.sort_values(by="predicted_days_to_stockout").iloc[0]
        
        lat = 18.1 + random.uniform(-0.5, 0.5)
        lng = 74.0 + random.uniform(-0.5, 0.5)
        
        status = "GREEN"
        days = float(critical_rec["predicted_days_to_stockout"])
        if days < 3:
            status = "RED"
        elif days < 7:
            status = "YELLOW"
            
        locs.append({
            "facility_id": f,
            "lat": lat,
            "lng": lng,
            "status": status,
            "critical_item": str(critical_rec["medicine_name"]),
            "days_to_stockout": days
        })
    return locs
