import flwr as fl
from typing import Dict, List, Optional, Tuple, Union
from flwr.server.strategy import Strategy
from flwr.server.client_proxy import ClientProxy
from flwr.server.client_manager import ClientManager
from flwr.common import (
    EvaluateIns,
    EvaluateRes,
    FitIns,
    FitRes,
    Parameters,
    Scalar,
    ndarrays_to_parameters,
    parameters_to_ndarrays,
)
import numpy as np

class FedBuffStrategy(Strategy):
    """
    Buffered Asynchronous Federated Learning (FedBuff).
    Maintains an asynchronous buffer of size K. Global model updates 
    only when K quantized client updates are received.
    """
    def __init__(self, K: int = 10, fraction_fit: float = 1.0, min_available_clients: int = 2):
        self.K = K
        self.fraction_fit = fraction_fit
        self.min_available_clients = min_available_clients
        
        # Buffer to store client updates
        self.update_buffer = []
        self.global_parameters = None

    def initialize_parameters(
        self, client_manager: ClientManager
    ) -> Optional[Parameters]:
        return None

    def configure_fit(
        self, server_round: int, parameters: Parameters, client_manager: ClientManager
    ) -> List[Tuple[ClientProxy, FitIns]]:
        
        self.global_parameters = parameters
        
        # Sample clients
        sample_size = int(client_manager.num_available() * self.fraction_fit)
        sample_size = max(sample_size, self.min_available_clients)
        clients = client_manager.sample(num_clients=sample_size)

        # Broadcast the global model to all sampled clients
        fit_ins = FitIns(parameters, {})
        return [(client, fit_ins) for client in clients]

    def aggregate_fit(
        self,
        server_round: int,
        results: List[Tuple[ClientProxy, FitRes]],
        failures: List[Union[Tuple[ClientProxy, FitRes], BaseException]],
    ) -> Tuple[Optional[Parameters], Dict[str, Scalar]]:
        
        # In FedBuff, we append to our asynchronous buffer
        for client, fit_res in results:
            # We assume client applied QAFeL and we get quantized weights (mocked as normal parameters here)
            self.update_buffer.append(parameters_to_ndarrays(fit_res.parameters))
        
        print(f"FedBuff Buffer size: {len(self.update_buffer)} / {self.K}")
        
        # Only aggregate if buffer reaches threshold K
        if len(self.update_buffer) >= self.K:
            print(f"Buffer reached threshold {self.K}. Executing Secure Aggregation...")
            
            # Simple aggregation (average)
            aggregated_weights = [
                np.mean(np.array([client_weights[layer] for client_weights in self.update_buffer[:self.K]]), axis=0)
                for layer in range(len(self.update_buffer[0]))
            ]
            
            # Clear the processed updates from the buffer
            self.update_buffer = self.update_buffer[self.K:]
            
            self.global_parameters = ndarrays_to_parameters(aggregated_weights)
            return self.global_parameters, {}
            
        # If buffer is not full, don't update global model yet
        return self.global_parameters, {}

    def configure_evaluate(
        self, server_round: int, parameters: Parameters, client_manager: ClientManager
    ) -> List[Tuple[ClientProxy, EvaluateIns]]:
        return []

    def aggregate_evaluate(
        self,
        server_round: int,
        results: List[Tuple[ClientProxy, EvaluateRes]],
        failures: List[Union[Tuple[ClientProxy, EvaluateRes], BaseException]],
    ) -> Tuple[Optional[float], Dict[str, Scalar]]:
        return None, {}

    def evaluate(
        self, server_round: int, parameters: Parameters
    ) -> Optional[Tuple[float, Dict[str, Scalar]]]:
        return None

def start_server():
    print("Starting FedBuff Central Aggregation Server...")
    # Using FedBuff strategy with K=10
    strategy = FedBuffStrategy(K=10)
    
    # Normally we run for many rounds, here we just configure for 3
    fl.server.start_server(
        server_address="0.0.0.1:8080",
        config=fl.server.ServerConfig(num_rounds=3),
        strategy=strategy,
    )

if __name__ == "__main__":
    start_server()
