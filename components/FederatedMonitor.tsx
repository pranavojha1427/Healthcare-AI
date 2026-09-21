"use client";

import { useEffect, useState } from "react";

export default function FederatedMonitor() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/federated/metrics")
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error(err));
  }, []);

  if (!metrics) return <div>Loading monitor...</div>;

  return (
    <div className="bg-surface-container border border-outline-variant p-4 rounded shadow-sm">
      <div className="flex items-center space-x-2 mb-4 border-b border-outline-variant pb-2">
        <span className="material-symbols-outlined text-secondary">security</span>
        <h2 className="font-headline-sm text-lg font-bold text-on-surface">Federated Learning & Privacy Monitor</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest p-3 border border-outline-variant">
          <div className="text-on-surface-variant text-sm mb-1">Local Training Round</div>
          <div className="font-code-sm font-bold text-xl text-on-surface">#{metrics.current_round}</div>
        </div>
        <div className="bg-surface-container-lowest p-3 border border-outline-variant">
          <div className="text-on-surface-variant text-sm mb-1">FedBuff Async Buffer Capacity</div>
          <div className="font-code-sm font-bold text-xl text-on-surface">{metrics.fedbuff_capacity}</div>
          <div className="text-xs text-on-surface-variant mt-1">K = {metrics.updates_received} updates received</div>
        </div>
        <div className="bg-surface-container-lowest p-3 border border-outline-variant">
          <div className="text-on-surface-variant text-sm mb-1">DPDP Differential Privacy Budget</div>
          <div className="font-code-sm font-bold text-xl text-emerald-700">ε = {metrics.dp_budget_epsilon}</div>
          <div className="text-xs text-on-surface-variant mt-1">δ ≤ {metrics.dp_budget_delta}</div>
        </div>
        <div className="bg-surface-container-lowest p-3 border border-outline-variant">
          <div className="text-on-surface-variant text-sm mb-1">Model Convergence</div>
          <div className="font-code-sm font-bold text-xl text-secondary">{metrics.convergence_rate}</div>
        </div>
      </div>
    </div>
  );
}
