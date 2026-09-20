FROM python:3.10-slim

WORKDIR /app

# Install dependencies including libpq-dev for psycopg2 and librdkafka for confluent-kafka
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    librdkafka-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
