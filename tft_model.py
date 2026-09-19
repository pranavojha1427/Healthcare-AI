import torch
from pytorch_forecasting.models.temporal_fusion_transformer import TemporalFusionTransformer
from pytorch_forecasting.metrics import QuantileLoss

def create_tft_model(training_dataset):
    """
    Instantiates the Temporal Fusion Transformer model using pytorch-forecasting.
    """
    tft = TemporalFusionTransformer.from_dataset(
        training_dataset,
        learning_rate=0.03,
        hidden_size=16,
        attention_head_size=1,
        dropout=0.1,
        hidden_continuous_size=8,
        output_size=7,  # 7 quantiles by default for QuantileLoss
        loss=QuantileLoss(),
        reduce_on_plateau_patience=4,
    )
    return tft
