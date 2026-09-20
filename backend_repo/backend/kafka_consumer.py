import os
import json
from confluent_kafka import Consumer, KafkaError

KAFKA_BROKER = os.getenv("KAFKA_BROKER", "localhost:9092")

conf = {
    'bootstrap.servers': KAFKA_BROKER,
    'group.id': 'evin-consumer-group',
    'auto.offset.reset': 'earliest'
}

consumer = Consumer(conf)
consumer.subscribe(['evin-telemetry'])

if __name__ == '__main__':
    print(f"Starting eVIN Telemetry Consumer (Broker: {KAFKA_BROKER})...")
    try:
        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                else:
                    print(f"Consumer error: {msg.error()}")
                    break
            
            data = json.loads(msg.value().decode('utf-8'))
            print(f"Received telemetry: {data}")
    except KeyboardInterrupt:
        pass
    finally:
        consumer.close()
