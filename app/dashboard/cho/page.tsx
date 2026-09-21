"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CHODashboard() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-surface-container-lowest font-sans flex flex-col max-w-lg mx-auto shadow-2xl border-x border-outline-variant">
      {/* Mobile Header */}
      <header className="bg-primary text-on-primary p-4 sticky top-0 z-50 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg">CHO Field Node</div>
            <div className="text-xs opacity-80">PHC_001 • DPDP Enclave Active</div>
          </div>
          <button onClick={() => router.push("/")} className="text-xs border border-on-primary px-2 py-1 rounded">Logout</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Vital Inputs */}
        <section>
          <h2 className="font-bold text-on-surface mb-3 flex items-center space-x-2 border-b border-outline-variant pb-2">
            <span className="material-symbols-outlined">vital_signs</span>
            <span>Health Center Vitals</span>
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container p-3 border border-outline-variant rounded">
              <div className="text-xs text-on-surface-variant">Bed Occupancy</div>
              <div className="font-bold text-xl text-on-surface mt-1">4 / 6</div>
              <button className="mt-2 w-full text-xs bg-secondary text-on-primary py-1 rounded">Update</button>
            </div>
            <div className="bg-surface-container p-3 border border-outline-variant rounded">
              <div className="text-xs text-on-surface-variant">Staff Attendance</div>
              <div className="font-bold text-xl text-on-surface mt-1">100%</div>
              <button className="mt-2 w-full text-xs bg-secondary text-on-primary py-1 rounded">Verify</button>
            </div>
          </div>
        </section>

        {/* Inventory Passbook */}
        <section>
          <h2 className="font-bold text-on-surface mb-3 flex items-center space-x-2 border-b border-outline-variant pb-2">
            <span className="material-symbols-outlined">inventory_2</span>
            <span>Predictive Inventory Passbook</span>
          </h2>
          <div className="bg-surface-container p-1 border border-outline-variant rounded overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container-high text-xs text-on-surface-variant uppercase">
                <tr>
                  <th className="p-2">Medicine (Top 5)</th>
                  <th className="p-2 text-right">Stock</th>
                  <th className="p-2 text-right">14d Demand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant bg-surface-container-lowest">
                <tr>
                  <td className="p-2 font-medium">Paracetamol 500mg</td>
                  <td className="p-2 text-right">340</td>
                  <td className="p-2 text-right text-error font-bold">450</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Amoxicillin 250mg</td>
                  <td className="p-2 text-right">120</td>
                  <td className="p-2 text-right">95</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Rabies Vaccine (ARV)</td>
                  <td className="p-2 text-right text-error font-bold">2</td>
                  <td className="p-2 text-right text-error font-bold">48</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Oxytocin 10 IU</td>
                  <td className="p-2 text-right text-amber-600 font-bold">24</td>
                  <td className="p-2 text-right">18</td>
                </tr>
              </tbody>
            </table>
            <button className="w-full bg-surface-container-high py-2 text-sm font-bold text-primary mt-2">
              AUTO-GENERATE INDENT
            </button>
          </div>
        </section>

        {/* Incoming Shipments Tracker */}
        <section>
          <h2 className="font-bold text-on-surface mb-3 flex items-center space-x-2 border-b border-outline-variant pb-2">
            <span className="material-symbols-outlined">local_shipping</span>
            <span>Incoming Shipments</span>
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-3 space-y-3">
            <div className="flex items-start space-x-3">
              <div className="mt-1 w-2 h-2 bg-emerald-600 rounded-full"></div>
              <div>
                <div className="text-sm font-bold">Lateral Transfer: Baramati SDH</div>
                <div className="text-xs text-on-surface-variant mt-0.5">180 Vials ARV • Dispatch #9912</div>
                <div className="text-xs font-bold text-secondary mt-1">ETA: 44 mins</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
