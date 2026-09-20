import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import asyncpg
import random
from typing import List

app = FastAPI(title="Healthcare API Emulators")

# Enable CORS for the frontend dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/healthcare_db")

async def get_db():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        await conn.close()

@app.get("/api/e-aushadhi/inventory-report")
async def get_inventory_report(facility_id: str, conn: asyncpg.Connection = Depends(get_db)):
    rows = await conn.fetch("SELECT * FROM e_aushadhi_stock WHERE facility_id = $1", facility_id)
    
    inventory_report = {
        "resourceType": "InventoryReport",
        "status": "active",
        "countType": "snapshot",
        "inventoryListing": []
    }
    
    for row in rows:
        item = {
            "item": {
                "reference": row['item_reference'],
                "display": row['item_display']
            },
            "quantity": {
                "value": row['quantity']
            }
        }
        inventory_report["inventoryListing"].append({"items": [item]})
        
    return inventory_report

@app.get("/api/e-aushadhi/supply-delivery")
async def get_supply_delivery(facility_id: str, conn: asyncpg.Connection = Depends(get_db)):
    rows = await conn.fetch("SELECT * FROM e_aushadhi_stock WHERE facility_id = $1", facility_id)
    
    deliveries = []
    for row in rows:
        delivery = {
            "resourceType": "SupplyDelivery",
            "status": "completed",
            "destination": {
                "reference": f"Location/{facility_id}"
            },
            "suppliedItem": {
                "quantity": {
                    "value": row['quantity']
                },
                "itemCodeableConcept": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/R4/valueset-supply-item.html",
                            "code": row['item_reference'],
                            "display": row['item_display']
                        }
                    ]
                }
            },
            "occurrenceDateTime": row['procurement_date'].isoformat() if row['procurement_date'] else None
        }
        deliveries.append(delivery)
        
    return deliveries

@app.get("/api/e-sushrut/hmis")
async def get_hmis_data(facility_id: str, conn: asyncpg.Connection = Depends(get_db)):
    rows = await conn.fetch("SELECT * FROM e_sushrut_hmis WHERE facility_id = $1 ORDER BY date DESC LIMIT 10", facility_id)
    
    observations = []
    for row in rows:
        observations.append({
            "resourceType": "Observation",
            "status": "final",
            "code": {
                "text": "Clinical Footfall"
            },
            "subject": {
                "reference": f"Location/{facility_id}"
            },
            "valueInteger": row['clinical_footfall'],
            "effectiveDateTime": row['date'].isoformat()
        })
    return observations

@app.get("/api/ews/predictions")
async def get_ews_predictions(facility_id: str):
    """
    Mock endpoint simulating the TFT multi-horizon forecast.
    In the real pipeline, the Edge-Forecaster writes JSON to a DB or Kafka,
    which this API would read. Here we simulate a 14-day stock depletion warning.
    """
    # Simulate a forecast indicating when a critical Class V item will stock out
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
