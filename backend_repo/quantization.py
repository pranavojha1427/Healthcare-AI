import numpy as np

def quantize_array(arr, num_bits=8):
    """
    Apply QAFeL Bidirectional Quantization compression scheme.
    Compresses the numpy array to reduce payload size.
    """
    if num_bits <= 0 or num_bits > 32:
        raise ValueError("num_bits must be between 1 and 32")
    
    # Simple uniform quantization as a proxy for QAFeL
    min_val = np.min(arr)
    max_val = np.max(arr)
    
    if max_val == min_val:
        return np.zeros_like(arr, dtype=np.uint8), min_val, max_val
        
    scale = ( (1 << num_bits) - 1 ) / (max_val - min_val)
    quantized_arr = np.round((arr - min_val) * scale).astype(np.uint8)
    
    return quantized_arr, min_val, max_val

def dequantize_array(quantized_arr, min_val, max_val, num_bits=8):
    """
    Dequantize the array back to float32.
    """
    if max_val == min_val:
        return np.full_like(quantized_arr, min_val, dtype=np.float32)
        
    scale = (max_val - min_val) / ( (1 << num_bits) - 1 )
    dequantized_arr = (quantized_arr.astype(np.float32) * scale) + min_val
    return dequantized_arr

def quantize_weights(weights, num_bits=8):
    """
    Quantize a list of numpy arrays (model weights).
    """
    quantized_weights = []
    metadata = []
    
    for w in weights:
        q_arr, min_v, max_v = quantize_array(w, num_bits)
        quantized_weights.append(q_arr)
        metadata.append((min_v, max_v))
        
    return quantized_weights, metadata

def dequantize_weights(quantized_weights, metadata, num_bits=8):
    """
    Dequantize a list of numpy arrays (model weights).
    """
    dequantized_weights = []
    
    for q_arr, (min_v, max_v) in zip(quantized_weights, metadata):
        arr = dequantize_array(q_arr, min_v, max_v, num_bits)
        dequantized_weights.append(arr)
        
    return dequantized_weights
