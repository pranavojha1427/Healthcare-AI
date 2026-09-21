"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Database, ShieldCheck, Cloud, GitMerge, Activity, Server, ArrowRight, ArrowDown, UserCog, User } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleLogin = (role: "manager" | "cho") => {
    // Simulate auth
    if (role === "manager") router.push("/dashboard/manager");
    if (role === "cho") router.push("/dashboard/cho");
  };

  const steps = [
    {
      id: 1,
      title: "Data Ingestion (PHC Edge)",
      icon: <Database className="w-6 h-6" />,
      desc: "e-Aushadhi (Supply), HMIS (Demand), eVIN (Cold-Chain) data generated daily.",
      color: "bg-blue-100 text-blue-700 border-blue-300"
    },
    {
      id: 2,
      title: "Sanitization & FHIR",
      icon: <Activity className="w-6 h-6" />,
      desc: "Patient records cleaned, formatted, and standardized (DPDP Compliant).",
      color: "bg-indigo-100 text-indigo-700 border-indigo-300"
    },
    {
      id: 3,
      title: "Privacy Checkpoint & Intelligence Loop",
      icon: <ShieldCheck className="w-6 h-6" />,
      desc: "Differential Privacy budget checked. Only compliant QAFcL compressed weights upload.",
      color: "bg-emerald-100 text-emerald-700 border-emerald-300"
    },
    {
      id: 4,
      title: "Central FedBuff Server",
      icon: <Cloud className="w-6 h-6" />,
      desc: "Asynchronous buffer & secure aggregation of local models.",
      color: "bg-purple-100 text-purple-700 border-purple-300"
    },
    {
      id: 5,
      title: "Optimization & MARL Rebalancing",
      icon: <GitMerge className="w-6 h-6" />,
      desc: "State-wide forecasts, EWS alarms, and MILP route optimization triggers.",
      color: "bg-rose-100 text-rose-700 border-rose-300"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-slate-900 text-white py-8 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-2">
            <Server className="w-8 h-8 text-emerald-400" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Federated AI Healthcare Supply Chain</h1>
          </div>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base">
            A privacy-preserving, predictive logistics network. Visualizing the complete architectural flow from last-mile data ingestion to automated lateral rebalancing.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* Architecture Pipeline Visualization */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center">
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-sm">1</span>
            System Architecture Workflow
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-4 relative">
            {/* Connection Lines (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded"></div>

            {steps.map((step, idx) => (
              <div key={step.id} className="relative flex flex-col items-center w-full lg:w-1/5 group cursor-default" onMouseEnter={() => setActiveStep(step.id)} onMouseLeave={() => setActiveStep(null)}>
                
                {/* Arrow for mobile */}
                {idx !== 0 && (
                  <ArrowDown className="block lg:hidden text-slate-300 my-4" />
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 bg-white ${activeStep === step.id ? step.color + ' scale-110 shadow-lg' : 'border-slate-200 text-slate-400 group-hover:border-slate-400'}`}>
                  {step.icon}
                </div>
                
                <div className={`mt-4 text-center transition-all duration-300 ${activeStep === step.id ? 'opacity-100' : 'opacity-70'}`}>
                  <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500 hidden lg:block leading-relaxed px-2">{step.desc}</p>
                </div>

                {/* Arrow overlay for desktop */}
                {idx !== steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-slate-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Active Step Details Banner */}
          <div className="mt-8 bg-slate-50 rounded-xl p-4 border border-slate-100 min-h-[80px] flex items-center justify-center text-center transition-all">
            {activeStep ? (
              <p className="text-sm font-medium text-slate-700 animate-in fade-in zoom-in duration-200">
                <span className="font-bold mr-2 text-slate-900">Step {activeStep}:</span> 
                {steps.find(s => s.id === activeStep)?.desc}
              </p>
            ) : (
              <p className="text-sm text-slate-400 italic">Hover over a node to view architectural details.</p>
            )}
          </div>
        </div>

        {/* Portal Entry Points */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-sm">2</span>
            Select Active Role Node
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* CHO Login */}
            <div 
              onClick={() => handleLogin("cho")}
              className="bg-white rounded-2xl p-6 border-2 border-transparent hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Clinic Officer (CHO)</h3>
              <p className="text-sm text-slate-500 mb-6">Access the Last-Mile Clinic View. View predictive inventory passbooks and auto-generate e-indents.</p>
              
              <div className="flex items-center text-emerald-600 font-semibold text-sm">
                Authenticate Node
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Manager Login */}
            <div 
              onClick={() => handleLogin("manager")}
              className="bg-white rounded-2xl p-6 border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <UserCog className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">District Logistics Manager</h3>
              <p className="text-sm text-slate-500 mb-6">Access the Command Dashboard. Monitor EWS stock-out alarms, authorize lateral transfers, and view the geospatial twin.</p>
              
              <div className="flex items-center text-blue-600 font-semibold text-sm">
                Authenticate Node
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
