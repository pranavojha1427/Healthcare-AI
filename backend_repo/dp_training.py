import torch
import numpy as np
from opacus import PrivacyEngine
from torch.optim import SGD
from opacus.validators import ModuleValidator
from opacus.utils.batch_memory_manager import BatchMemoryManager

def get_gradient_norm(model):
    """Calculate the L2 norm of gradients."""
    total_norm = 0.0
    for p in model.parameters():
        if p.grad is not None:
            param_norm = p.grad.detach().data.norm(2)
            total_norm += param_norm.item() ** 2
    return total_norm ** 0.5

def dp_train_model(model, train_dataloader, epochs=5, epsilon=1.0, delta=1e-5, warmup_rounds=3):
    """
    Train model with DP-SGD, using dynamic clipping norm based on the 
    50th percentile of unclipped gradient L2-norms during warmup rounds.
    """
    model.train()
    
    # Ensure model is compatible with Opacus
    # pytorch-forecasting models might have complex structures. We may need to fix them.
    # ModuleValidator.fix(model) might be needed, but we'll try to just wrap it.
    try:
        model = ModuleValidator.fix(model)
    except Exception as e:
        print(f"Opacus module fix warning: {e}")
        pass
        
    optimizer = SGD(model.parameters(), lr=0.01)
    
    # We will compute the unclipped gradients manually for warmup rounds
    # to dynamically set C (clipping threshold).
    
    unclipped_norms = []
    
    # Warmup rounds
    print(f"Starting {warmup_rounds} warmup rounds for dynamic clipping estimation...")
    for round_idx in range(warmup_rounds):
        for batch_idx, (x, y) in enumerate(train_dataloader):
            optimizer.zero_grad()
            # Pytorch forecasting passes a tuple (x, y)
            y_hat, _ = model.forward(**x) if isinstance(x, dict) else model(x)
            loss = model.loss(y_hat, y[0]) # y is typically a tuple of (target, weight)
            loss.backward()
            
            # Record unclipped L2 norm
            unclipped_norms.append(get_gradient_norm(model))
            optimizer.step()
            break # Just one batch per warmup round for estimation (or use full epoch)

    # Calculate C as the 50th percentile of observed unclipped norms
    clipping_threshold = np.percentile(unclipped_norms, 50) if unclipped_norms else 1.0
    print(f"Dynamic clipping threshold C set to: {clipping_threshold:.4f}")
    
    # Now wrap with PrivacyEngine
    privacy_engine = PrivacyEngine()
    
    # Opacus requires the model, optimizer, and dataloader
    # Note: make sure dataloader doesn't drop_last=False if batch_size doesn't divide dataset perfectly
    model, optimizer, train_dataloader = privacy_engine.make_private_with_epsilon(
        module=model,
        optimizer=optimizer,
        data_loader=train_dataloader,
        target_epsilon=epsilon,
        target_delta=delta,
        epochs=epochs,
        max_grad_norm=clipping_threshold,
    )
    
    print(f"Targeting epsilon={epsilon}, delta={delta}")
    
    # Actual DP training
    for epoch in range(epochs):
        epoch_loss = 0.0
        # Batch memory manager helps with memory issues in Opacus
        with BatchMemoryManager(
            data_loader=train_dataloader, 
            max_physical_batch_size=32, 
            optimizer=optimizer
        ) as memory_safe_data_loader:
            for i, (x, y) in enumerate(memory_safe_data_loader):
                optimizer.zero_grad()
                
                # Model forward
                # Since model is wrapped by Opacus (GradSampleModule), we might need to handle inputs carefully
                y_hat, _ = model(**x) if isinstance(x, dict) else model(x)
                
                loss = model._module.loss(y_hat, y[0]) if hasattr(model, '_module') else model.loss(y_hat, y[0])
                loss.backward()
                optimizer.step()
                
                epoch_loss += loss.item()
                
        epsilon_achieved = privacy_engine.get_epsilon(delta)
        print(f"Epoch {epoch+1}/{epochs} | Loss: {epoch_loss/len(train_dataloader):.4f} | Epsilon: {epsilon_achieved:.4f}")
        
    return model
