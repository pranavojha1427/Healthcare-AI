with open('backend_repo/backend/main.py', 'r') as f:
    code = f.read()

code = code.replace(
    'rec["stock_on_hand"]',
    'int(rec["stock_on_hand"])'
).replace(
    'rec["daily_consumption_rate"]',
    'int(rec["daily_consumption_rate"])'
).replace(
    'rec["patient_footfall"]',
    'int(rec["patient_footfall"])'
).replace(
    'critical_rec["predicted_days_to_stockout"]',
    'float(critical_rec["predicted_days_to_stockout"])'
).replace(
    'critical_rec["stock_on_hand"]',
    'int(critical_rec["stock_on_hand"])'
).replace(
    'critical_rec["daily_consumption_rate"]',
    'int(critical_rec["daily_consumption_rate"])'
).replace(
    'critical_rec["nearest_hub_surplus"]',
    'int(critical_rec["nearest_hub_surplus"])'
).replace(
    'critical_rec["hub_distance_km"]',
    'float(critical_rec["hub_distance_km"])'
).replace(
    'critical_rec["critical_deficit_flag"] == 1',
    'int(critical_rec["critical_deficit_flag"]) == 1'
)

with open('backend_repo/backend/main.py', 'w') as f:
    f.write(code)
