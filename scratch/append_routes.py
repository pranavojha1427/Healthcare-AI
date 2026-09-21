from pydantic import BaseModel
import math

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
