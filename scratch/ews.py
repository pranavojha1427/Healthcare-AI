
@app.get("/api/ews/predictions")
async def get_ews_predictions(facility_id: str):
    """
    Mock endpoint simulating the TFT multi-horizon forecast.
    In the real pipeline, the Edge-Forecaster writes JSON to a DB or Kafka,
    which this API would read. Here we simulate a 14-day stock depletion warning.
    """
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
