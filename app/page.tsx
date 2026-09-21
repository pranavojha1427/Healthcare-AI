"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (data.token) {
        if (data.role === "MANAGER") {
          router.push("/dashboard/manager");
        } else if (data.role === "CHO") {
          router.push("/dashboard/cho");
        }
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Failed to connect to backend");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface font-sans text-on-surface">
      <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-xl shadow-lg border border-outline-variant">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl">health_and_safety</span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold">Federated Health Network</h1>
          <p className="text-on-surface-variant mt-2 font-body-sm">MoHFW Logistics & Telemetry Command</p>
        </div>

        {error && <div className="mb-4 p-3 bg-error-container text-on-error-container text-sm rounded">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username (manager or cho)</label>
            <input 
              type="text" 
              className="w-full p-2 border border-outline rounded bg-surface focus:border-primary focus:outline-none"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password (any)</label>
            <input 
              type="password" 
              className="w-full p-2 border border-outline rounded bg-surface focus:border-primary focus:outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-primary text-on-primary py-2.5 rounded font-medium hover:opacity-90 transition-opacity"
          >
            Authenticate Node
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-outline-variant pt-4">
          <p className="font-code-sm text-xs text-on-surface-variant">DPDP ACT (2023) COMPLIANT DATA ENCLAVE</p>
        </div>
      </div>
    </div>
  );
}
