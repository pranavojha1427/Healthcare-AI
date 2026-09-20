# Federated ML Pipeline for Healthcare Supply Chain
## Core Objective
Engineer the core machine learning pipeline for a decentralized, predictive digital twin of the Indian public healthcare supply chain.

## Modules:
1. `dataset.py` - Generates mock localized e-Aushadhi inventory data, HMIS footfall metrics, and eVIN temperature logs and handles `TimeSeriesDataSet`.
2. `tft_model.py` - Temporal Fusion Transformer (TFT) model instantiation.
3. `dp_training.py` - Integrates Opacus for DP-SGD with dynamic gradient clipping and adaptive noise.
4. `quantization.py` - QAFeL Bidirectional Quantization.
5. `client.py` - Flower Edge-Forecaster Client.
6. `server.py` - FedBuff Central Server Aggregation Strategy (buffer size K=10).

## Execution:
1. Start the server:
   ```bash
   python server.py
   ```
2. Start the clients (at least 10 to hit the FedBuff buffer size `K=10`):
   ```bash
   python client.py
   ```
