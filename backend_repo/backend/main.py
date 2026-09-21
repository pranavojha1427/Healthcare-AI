import os
import random
from fastapi import FastAPI
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

@app.get("/api/e-aushadhi/inventory-report")
async def get_inventory_report(facility_id: str):
    inventory_report = {
        "resourceType": "InventoryReport",
        "status": "active",
        "countType": "snapshot",
        "inventoryListing": [
            {
                "items": [
                    {
                        "item": {
                            "reference": "MED-001",
                            "display": "Paracetamol 500mg"
                        },
                        "quantity": {
                            "value": random.randint(10, 100)
                        }
                    }
                ]
            },
            {
                "items": [
                    {
                        "item": {
                            "reference": "MED-002",
                            "display": "Amoxicillin 250mg"
                        },
                        "quantity": {
                            "value": random.randint(5, 50)
                        }
                    }
                ]
            }
        ]
    }
    return inventory_report

@app.get("/api/e-aushadhi/supply-delivery")
async def get_supply_delivery(facility_id: str):
    return []

@app.get("/api/e-sushrut/hmis")
async def get_hmis_data(facility_id: str):
    observations = []
    for i in range(10):
        observations.append({
            "resourceType": "Observation",
            "status": "final",
            "code": {
                "text": "Clinical Footfall"
            },
            "subject": {
                "reference": f"Location/{facility_id}"
            },
            "valueInteger": random.randint(20, 150),
            "effectiveDateTime": datetime.now().isoformat()
        })
    return observations

@app.get("/api/ews/predictions")
async def get_ews_predictions(facility_id: str):
    days_to_depletion = random.randint(2, 14)
    confidence = round(random.uniform(85.0, 99.0), 2)
    
    return {
        "facility_id": facility_id,
        "prediction": {
            "critical_item": "Paracetamol 500mg (Class V)",
            "estimated_depletion_days": days_to_depletion,
            "confidence_interval_percent": confidence,
            "status": "CRITICAL" if days_to_depletion <= 5 else "STABLE"
        },
        "forecast_horizon_days": 14
    }


