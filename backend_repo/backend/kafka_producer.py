import os
import json
import time
import random
from datetime import datetime, timezone
from confluent_kafka import Producer

# Kafka broker address from env or default to localhost
KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9092")

conf = {
    'bootstrap.servers': KAFKA_BROKER,
    'client.id': 'evin-producer'
}

producer = Producer(conf)

def delivery_report(err, msg):
    if err is not None:
        print(f"Message delivery failed: {err}")
    else:
        print(f"Message delivered to {msg.topic()} [{msg.partition()}]")

def generate_telemetry():
    facilities = ["PHC_01", "PHC_02", "CHC_01"]
    while True:
        for facility in facilities:
            data = {
                "device_id": f"DEV_{facility}",
                "facility_id": facility,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "temperature_celsius": round(random.uniform(2.0, 8.5), 2),
                "status": "active"
            }
            try:
                producer.produce(
                    'evin-telemetry',
                    key=facility.encode('utf-8'),
                    value=json.dumps(data).encode('utf-8'),
                    callback=delivery_report
                )
            except Exception as e:
                print(f"Error producing message: {e}")
                
        producer.poll(0)
        time.sleep(3600)  # 60-minute interval

if __name__ == '__main__':
    print(f"Starting eVIN Telemetry Producer (Broker: {KAFKA_BROKER})...")
    try:
        generate_telemetry()
    except KeyboardInterrupt:
        pass
    finally:
        producer.flush()
