"use client";
import { useState, useEffect } from "react";
import MapWrapper from "../../../components/MapWrapper";
import FederatedMonitor from "../../../components/FederatedMonitor";
import ForecastChart from "../../../components/ForecastChart";

export default function ManagerDashboard() {
  const [facility, setFacility] = useState("PHC_001");
  const [inventory, setInventory] = useState<any[]>([]);
  const [footfall, setFootfall] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Geospatial Map");

  const API_URL = "http://localhost:8000";

  const fetchData = async () => {
    try {
      // Fetch Inventory
      const invRes = await fetch(`${API_URL}/api/e-aushadhi/inventory-report?facility_id=${facility}`);
      if (invRes.ok) {
        const invData = await invRes.json();
        if (invData.inventoryListing && invData.inventoryListing.length > 0) {
          setInventory(invData.inventoryListing.map((lst: any) => lst.items[0]));
        } else { setInventory([]); }
      }
      // Fetch HMIS Footfall
      const hmisRes = await fetch(`${API_URL}/api/e-sushrut/hmis?facility_id=${facility}`);
      if (hmisRes.ok) setFootfall(await hmisRes.json());

      // Fetch EWS Prediction
      const predRes = await fetch(`${API_URL}/api/ews/predictions?facility_id=${facility}`);
      if (predRes.ok) {
        const predData = await predRes.json();
        setPrediction(predData.prediction);
      }
    } catch (error) { console.error("Error fetching data:", error); }
  };

  useEffect(() => { fetchData(); }, [facility]);

  return (
    <div className="bg-surface font-sans text-on-surface w-full min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-on-primary">
      {/* The JSX converted from Stitch */}
      
{/* ================= TOPNAVBAR (Shared Component Contract) ================= */}
<header className="bg-surface-container-lowest dark:bg-surface-container-lowest docked full-width top-0 z-50 border-b border-outline-variant dark:border-outline-variant flat no shadows flex justify-between items-center w-full px-margin h-12">
{/* Brand / National Crest & Identity */}
<div className="flex items-center space-x-gutter">
<div className="flex items-center space-x-space-xs">
<div className="w-6 h-6 bg-primary-container text-on-primary flex items-center justify-center font-code-sm text-code-sm font-bold border border-outline-variant">
          NHM
        </div>
<div className="flex flex-col">
<span className="text-headline-sm font-headline-sm font-bold text-on-surface dark:text-on-surface uppercase tracking-wider leading-none">NHM Telemetry Engine | MoHFW</span>
<span className="font-code-sm text-code-sm text-on-surface-variant leading-none mt-0.5">GOV OF INDIA • FA-LOGISTICS NODE MH-04</span>
</div>
</div>
<span className="text-outline-variant">|</span>
{/* Search / Operational Zone Selector */}
<div className="hidden lg:flex items-center space-x-space-xs bg-surface-container-low border border-outline-variant px-2 py-0.5">
<span className="material-symbols-outlined text-on-surface-variant">search</span>
<select className="bg-transparent border-0 font-body-sm text-body-sm text-on-surface py-0 px-1 focus:ring-0 focus:outline-none cursor-pointer">
<option>Zone: Maharashtra Rural-IV (Pune-Solapur-Satara Belt)</option>
<option>Zone: Maharashtra Rural-I (Nashik-Dhule-Nandurbar)</option>
<option>Zone: Karnataka North-II (Belagavi-Bagalkot)</option>
</select>
</div>
</div>
{/* Navigation Links & Live Kafka Broker Telemetry */}

{/* Telemetry Status Badges & Trailing Actions */}
<div className="flex items-center space-x-gutter">
{/* Kafka Stream Indicator */}
<div className="hidden md:flex items-center space-x-space-xs bg-surface-container px-2 py-1 border border-outline-variant">
<div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse-dot"></div>
<span className="font-code-sm text-code-sm text-on-surface">KAFKA: 18ms • 2,410 msg/s</span>
</div>
{/* Severity Chip */}
<div className="flex items-center space-x-space-xs bg-error-container border border-error px-2 py-0.5">
<span className="w-1.5 h-1.5 bg-error"></span>
<span className="font-code-sm text-code-sm text-on-error-container font-bold">DEFICIT: ORANGE (PHC Indapur)</span>
</div>
{/* CHO Field Simulator Toggle */}
<button className="border border-secondary bg-surface-container-lowest text-secondary font-label-sm text-label-sm px-2.5 h-7 flex items-center space-x-1 hover:bg-surface-container transition-colors duration-150">
<span className="material-symbols-outlined">phone_android</span>
<span>CHO Field PWA</span>
</button>
{/* Emergency Override Primary CTA */}
<button className="bg-error hover:bg-red-700 text-on-error font-body-sm text-body-sm font-semibold px-2.5 h-7 flex items-center space-x-1 border border-red-800 transition-colors duration-150">
<span className="material-symbols-outlined">warning</span>
<span>Emergency Override</span>
</button>
{/* Icons */}
<div className="hidden sm:flex items-center space-x-1 text-on-surface-variant">
<button className="p-1 hover:bg-surface-container border border-transparent hover:border-outline-variant" title="Sync Engine">
<span className="material-symbols-outlined">sync</span>
</button>
<button className="p-1 hover:bg-surface-container border border-transparent hover:border-outline-variant relative" title="Notifications">
<span className="material-symbols-outlined">notifications_active</span>
<span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-error"></span>
</button>
<button className="p-1 hover:bg-surface-container border border-transparent hover:border-outline-variant" title="System Settings">
<span className="material-symbols-outlined">settings</span>
</button>
</div>
</div>
</header>
{/* ================= MAIN COMMAND STAGE WITH PERSISTENT TELEMETRY RAIL ================= */}
<div className="flex w-full min-h-[calc(100vh-3rem-1.75rem)] pt-0">
{/* SideNavBar (Shared Component Contract) */}
<aside className="hidden lg:flex fixed left-0 top-12 bottom-7 w-60 flex-col justify-between p-space-sm border-r border-outline-variant dark:border-outline-variant bg-surface-container-low dark:bg-surface-container-low z-40">
{/* Rail Header */}
<div>
<div className="px-3 py-2 border-b border-outline-variant mb-2">
<div className="flex items-center space-x-2">
<div className="w-4 h-4 bg-primary text-on-primary font-code-sm text-code-sm flex items-center justify-center font-bold">IN</div>
<div>
<div className="text-label-md font-label-md font-bold text-on-surface dark:text-on-surface">Zone Alpha-4</div>
<div className="font-code-sm text-code-sm text-on-surface-variant">Kafka Connected: 18ms</div>
</div>
</div>
</div>
{/* Rail Navigation Items */}
<nav className="space-y-1">
<a className="flex items-center space-x-2 bg-surface-container-highest dark:bg-surface-container-highest text-secondary dark:text-secondary border-l-2 border-secondary dark:border-secondary font-medium px-3 py-2 text-label-md font-label-md" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span>Command Stage</span>
</a>
<a className="flex items-center space-x-2 text-on-surface-variant dark:text-on-surface-variant font-normal px-3 py-2 hover:bg-surface-container dark:hover:bg-surface-container hover:text-on-surface text-label-md font-label-md" href="#">
<span className="material-symbols-outlined">hub</span>
<span>Spatial Cluster</span>
</a>
<a className="flex items-center space-x-2 text-on-surface-variant dark:text-on-surface-variant font-normal px-3 py-2 hover:bg-surface-container dark:hover:bg-surface-container hover:text-on-surface text-label-md font-label-md" href="#">
<span className="material-symbols-outlined">local_shipping</span>
<span>Logistics Matrix</span>
</a>
<a className="flex items-center space-x-2 text-on-surface-variant dark:text-on-surface-variant font-normal px-3 py-2 hover:bg-surface-container dark:hover:bg-surface-container hover:text-on-surface text-label-md font-label-md" href="#">
<span className="material-symbols-outlined">device_thermostat</span>
<span>Cold-Chain IoT</span>
</a>
<a className="flex items-center space-x-2 text-on-surface-variant dark:text-on-surface-variant font-normal px-3 py-2 hover:bg-surface-container dark:hover:bg-surface-container hover:text-on-surface text-label-md font-label-md" href="#">
<span className="material-symbols-outlined">verified_user</span>
<span>Audit Compliance</span>
</a>
</nav>
{/* Rail Action CTA */}
<div className="mt-4 px-2">
<button className="w-full bg-primary text-on-primary font-label-sm text-label-sm py-2 px-2 border border-outline uppercase tracking-wider font-semibold hover:bg-surface-variant hover:text-on-surface transition-colors flex items-center justify-center space-x-1">
<span className="material-symbols-outlined">alt_route</span>
<span>Authorize MILP Transfer</span>
</button>
</div>
{/* Telemetry Node Metric Inset */}
<div className="mt-4 p-2 bg-surface-container border border-outline-variant text-code-sm font-code-sm">
<div className="text-on-surface-variant uppercase font-semibold">Federated Node Status</div>
<div className="flex justify-between mt-1 text-on-surface">
<span>Model Convergence:</span>
<span className="font-bold text-emerald-700">99.4%</span>
</div>
<div className="flex justify-between text-on-surface">
<span>Federated Round:</span>
<span>#412 (Local)</span>
</div>
<div className="flex justify-between text-on-surface">
<span>Loss Metric:</span>
<span>0.0418 QL</span>
</div>
</div>
</div>
{/* Rail Footer Items */}
<div className="pt-2 border-t border-outline-variant space-y-1">
<a className="flex items-center space-x-2 text-on-surface-variant font-normal px-3 py-1.5 hover:bg-surface-container text-label-md font-label-md" href="#" onClick={(e) => { e.preventDefault(); setActiveTab("Field Node (CHO Mobile)"); }}>
<span className="material-symbols-outlined">phone_android</span>
<span>CHO Field Simulator</span>
</a>
<a className="flex items-center space-x-2 text-on-surface-variant font-normal px-3 py-1.5 hover:bg-surface-container text-label-md font-label-md" href="#">
<span className="material-symbols-outlined">security</span>
<span>DPDP Act Logs</span>
</a>
</div>
</aside>
{/* CONTENT CANVAS (Shifted by 240px when SideNavBar is rendered) */}
<main className="flex-1 lg:ml-60 flex flex-col min-w-0 bg-surface">

        {/* NEW TAB BAR */}
        <div className="flex border-b border-outline-variant bg-surface-container-low px-4 pt-2 space-x-6 overflow-x-auto">
          {['Geospatial Map', 'TFT Alerts & Logistics', 'Analytics & Federated Health'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`pb-2 font-headline-sm whitespace-nowrap ${activeTab === tab ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              {tab}
            </button>
          ))}
        </div>

{/* Sub-Bar: Command Stage Metadata & Instant Filters */}
<div className="bg-surface-container-lowest border-b border-outline-variant px-margin py-2 flex flex-wrap items-center justify-between gap-2">
<div className="flex items-center space-x-gutter">
<div className="flex items-center space-x-2">
<span className="font-headline-sm text-headline-sm text-on-surface">District Pune • Rural Sub-Division Indapur-Baramati</span>
<span className="font-code-sm text-code-sm bg-surface-container px-1.5 py-0.5 border border-outline-variant">NIN GEO-BOUND: 413106 / MH-PUN</span>
</div>
</div>
<div className="flex items-center space-x-2 font-label-sm text-label-sm">
<span className="text-on-surface-variant">VIEW LAYER:</span>
<button className="bg-surface-container-highest border border-secondary text-secondary px-2 py-0.5 font-medium">TFT Stockouts (Active)</button>
<button className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-2 py-0.5 hover:bg-surface-container">Cold-Chain Sensors</button>
<button className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-2 py-0.5 hover:bg-surface-container">MILP Corridors</button>
<button className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-2 py-0.5 hover:bg-surface-container">Bed Inventory</button>
</div>
</div>
{/* Main Two-Column Telemetry Grid (Map Viewport + Alert Panel) */}
<div className="flex-1 w-full flex flex-col min-h-[calc(100vh-8.5rem)]">
{/* GEOSPATIAL MAP CANVAS */}
{activeTab === "Geospatial Map" && (
<div className="w-full flex flex-col bg-surface-container-lowest relative flex-1">
{/* Map Control HUD Overlay */}
<div className="absolute top-3 left-3 z-20 flex flex-col space-y-1 bg-surface-container-lowest/95 border border-outline-variant p-2 shadow-none backdrop-blur-sm max-w-xs">
<div className="font-label-sm text-label-sm font-bold text-on-surface flex items-center justify-between border-b border-outline-variant pb-1">
<span>ACTIVE SURVEILLANCE MESH</span>
<span className="font-code-sm text-code-sm bg-emerald-100 text-emerald-800 px-1">STABLE RT</span>
</div>
<div className="text-code-sm font-code-sm space-y-0.5 text-on-surface-variant pt-1">
<div>Total Monitored Nodes: <span className="font-bold text-on-surface">54 Facilities</span></div>
<div>Critical Stock Deficit (&lt;72h): <span className="font-bold text-error">1 Facility</span></div>
<div>High Vulnerability (3-7d): <span className="font-bold text-amber-700">4 Facilities</span></div>
<div>Surplus Donor Nodes: <span className="font-bold text-emerald-700">12 Facilities</span></div>
</div>
<div className="pt-1 border-t border-outline-variant flex items-center justify-between text-code-sm">
<span className="text-on-surface-variant">Active Lateral Vector:</span>
<span className="font-bold text-secondary">SH-54 Corridor</span>
</div>
</div>
{/* Map Zoom / Layer Toggles Bottom Right HUD */}
<div className="absolute bottom-3 right-3 z-20 flex space-x-1">
<div className="bg-surface-container-lowest border border-outline-variant p-1 flex items-center space-x-1 font-code-sm text-code-sm">
<button className="px-2 py-1 bg-surface-container hover:bg-surface-variant border border-outline-variant">+</button>
<button className="px-2 py-1 bg-surface-container hover:bg-surface-variant border border-outline-variant">-</button>
<button className="px-2 py-1 bg-surface-container hover:bg-surface-variant border border-outline-variant">RESET GIS</button>
</div>
</div>
{/* Simulated High-Performance Vector Health Map Graphic (SVG Engine) */}
<div className="relative w-full h-[540px] xl:h-full bg-[#f1f5f9] overflow-hidden flex items-center justify-center">
<svg className="w-full h-full object-cover select-none" viewBox="0 0 900 620">
{/* Geographic Grid Background Lines */}
<defs>
<pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
<path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"></path>
</pattern>
<marker id="arrow" markerHeight="6" markerWidth="6" orient="auto-start-reverse" refX="5" refY="5" viewBox="0 0 10 10">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#1d4ed8"></path>
</marker>
</defs>
<rect fill="#f8fafc" height="100%" width="100%"></rect>
<rect fill="url(#grid)" height="100%" width="100%"></rect>
{/* River / Topographical Boundary (Bhima River Corridor) */}
<path d="M 20 280 C 140 260, 240 310, 360 290 S 520 220, 680 270 S 840 340, 890 330" fill="none" opacity="0.6" stroke="#cbd5e1" strokeWidth="8"></path>
<text className="font-code-sm text-code-sm" fill="#94a3b8" x="760" y="320">BHIMA RIVER</text>
{/* State Highways & District Roads */}
{/* SH-54 Baramati - Indapur Connector */}
<path d="M 280 380 L 460 340 L 640 410" fill="none" stroke="#94a3b8" strokeWidth="3"></path>
<text fill="#64748b" fontFamily="JetBrains Mono" fontSize="9" transform="rotate(-12 360 350)" x="360" y="350">STATE HIGHWAY 54</text>
{/* NH-65 Solapur Road */}
<path d="M 120 180 L 380 230 L 640 410 L 860 480" fill="none" stroke="#cbd5e1" strokeWidth="4"></path>
<text fill="#64748b" fontFamily="JetBrains Mono" fontSize="9" x="180" y="195">NATIONAL HIGHWAY 65</text>
{/* Arterial Secondary Roads */}
<path d="M 280 380 L 260 210" fill="none" stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="1.5"></path>
<path d="M 460 340 L 520 160" fill="none" stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="1.5"></path>
<path d="M 640 410 L 720 230" fill="none" stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="1.5"></path>
<path d="M 640 410 L 600 550" fill="none" stroke="#e2e8f0" strokeDasharray="2 2" strokeWidth="1.5"></path>
{/* ACTIVE MILP TRANSFER VECTOR (Baramati SDH -> PHC Indapur) */}
<path className="vector-active-route" d="M 280 380 Q 450 310, 640 410" fill="none" markerEnd="url(#arrow)" stroke="#1d4ed8" strokeWidth="3.5"></path>
{/* Active Transfer Vector Label */}
<g transform="translate(420, 315)">
<rect fill="#0f172a" height="24" rx="2" width="170"></rect>
<text fill="#ffffff" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" x="8" y="16">EV DISPATCH #9912: ETA 44m</text>
</g>
{/* STABLE NODES (Green Squares) */}
{/* CHC Shirur */}
<g transform="translate(180, 120)">
<rect fill="#166534" height="14" stroke="#ffffff" strokeWidth="1.5" width="14"></rect>
<text fill="#0f172a" fontFamily="Public Sans" fontSize="11" fontWeight="600" x="18" y="11">CHC Shirur</text>
<text fill="#166534" fontFamily="JetBrains Mono" fontSize="9" x="18" y="22">Stock: 22d • 4.1°C</text>
</g>
{/* SDH Saswad */}
<g transform="translate(140, 360)">
<rect fill="#166534" height="14" stroke="#ffffff" strokeWidth="1.5" width="14"></rect>
<text fill="#0f172a" fontFamily="Public Sans" fontSize="11" fontWeight="600" x="18" y="11">SDH Saswad</text>
<text fill="#166534" fontFamily="JetBrains Mono" fontSize="9" x="18" y="22">Stock: 19d • 3.8°C</text>
</g>
{/* CHC Daund (Moderate warning) */}
<g transform="translate(460, 240)">
<rect fill="#d97706" height="14" stroke="#ffffff" strokeWidth="1.5" width="14"></rect>
<text fill="#0f172a" fontFamily="Public Sans" fontSize="11" fontWeight="600" x="18" y="11">CHC Daund</text>
<text fill="#b45309" fontFamily="JetBrains Mono" fontSize="9" x="18" y="22">Ceftriaxone: 9d (TFT Warning)</text>
</g>
{/* PHC Bhor */}
<g transform="translate(100, 480)">
<rect fill="#d97706" height="14" stroke="#ffffff" strokeWidth="1.5" width="14"></rect>
<text fill="#0f172a" fontFamily="Public Sans" fontSize="11" fontWeight="600" x="18" y="11">PHC Bhor</text>
<text fill="#b45309" fontFamily="JetBrains Mono" fontSize="9" x="18" y="22">Oxytocin: 5.2d (TFT Warning)</text>
</g>
{/* CHC Baramati (DONOR SURPLUS HUB) */}
<g className="cursor-pointer" transform="translate(280, 380)">
{/* Pulse circle for surplus node */}
<circle cx="7" cy="7" fill="#2563eb" opacity="0.2" r="14"></circle>
<rect fill="#1d4ed8" height="16" stroke="#ffffff" strokeWidth="2" width="16"></rect>
<text fill="#0f172a" fontFamily="Public Sans" fontSize="12" fontWeight="bold" x="22" y="9">Baramati SDH [SURPLUS HUB]</text>
<text fill="#1d4ed8" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" x="22" y="22">ARV: +180 Vials • Cold Box x4</text>
</g>
{/* PHC Waki (Cold Chain Breach) */}
<g transform="translate(540, 150)">
<polygon fill="#dc2626" points="7,0 14,14 0,14" stroke="#ffffff" strokeWidth="1.5"></polygon>
<text fill="#0f172a" fontFamily="Public Sans" fontSize="11" fontWeight="600" x="18" y="10">CHC Waki</text>
<text fill="#dc2626" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" x="18" y="22">ILR-02: 9.4°C [BREACH 22m]</text>
</g>
{/* PHC INDAPUR (CRITICAL DEFICIT TARGET) */}
<g className="cursor-pointer" transform="translate(640, 410)">
{/* Outer critical alert ring */}
<circle className="animate-ping" cx="8" cy="8" fill="#dc2626" opacity="0.25" r="18"></circle>
<rect fill="#dc2626" height="18" stroke="#ffffff" strokeWidth="2" width="18"></rect>
<text fill="#991b1b" fontFamily="Public Sans" fontSize="13" fontWeight="800" x="24" y="10">PHC INDAPUR (CRITICAL DEFICIT)</text>
<text fill="#dc2626" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold" x="24" y="23">ARV: 18h REMAINING (Surge +340%)</text>
</g>
{/* Additional background minor SC / PHC cluster points */}
<circle cx="340" cy="280" fill="#166534" r="3.5"></circle>
<circle cx="410" cy="380" fill="#166534" r="3.5"></circle>
<circle cx="500" cy="420" fill="#166534" r="3.5"></circle>
<circle cx="700" cy="460" fill="#166534" r="3.5"></circle>
<circle cx="680" cy="380" fill="#166534" r="3.5"></circle>
<circle cx="580" cy="480" fill="#166534" r="3.5"></circle>
<circle cx="740" cy="390" fill="#166534" r="3.5"></circle>
<circle cx="610" cy="330" fill="#166534" r="3.5"></circle>
<circle cx="310" cy="460" fill="#166534" r="3.5"></circle>
<circle cx="210" cy="420" fill="#166534" r="3.5"></circle>
<circle cx="440" cy="490" fill="#166534" r="3.5"></circle>
<circle cx="520" cy="290" fill="#166534" r="3.5"></circle>
<circle cx="390" cy="210" fill="#166534" r="3.5"></circle>
<circle cx="600" cy="210" fill="#166534" r="3.5"></circle>
{/* GIS Scale Bar */}
<g transform="translate(40, 580)">
<line stroke="#0f172a" strokeWidth="2" x1="0" x2="80" y1="0" y2="0"></line>
<line stroke="#0f172a" strokeWidth="2" x1="0" x2="0" y1="-4" y2="4"></line>
<line stroke="#0f172a" strokeWidth="2" x1="80" x2="80" y1="-4" y2="4"></line>
<text fill="#0f172a" fontFamily="JetBrains Mono" fontSize="9" x="24" y="-5">20 KILOMETERS</text>
</g>
</svg>
{/* INTERACTIVE POPUP INSPECTOR: PHC INDAPUR (Fixed on canvas) */}
<div className="absolute bottom-16 left-8 bg-surface-container-lowest border-2 border-primary w-80 shadow-none z-30">
<div className="bg-primary text-on-primary px-2.5 py-1.5 flex justify-between items-center">
<div className="flex items-center space-x-1.5">
<span className="w-2 h-2 bg-error"></span>
<span className="font-headline-sm text-headline-sm text-white font-bold">NODE INSPECTOR: PHC Indapur</span>
</div>
<span className="font-code-sm text-code-sm text-surface-variant">MH-PUN-0842</span>
</div>
<div className="p-2.5 space-y-2 text-body-sm font-body-sm">
<div className="grid grid-cols-2 gap-2 text-code-sm font-code-sm border-b border-outline-variant pb-2">
<div>
<span className="text-on-surface-variant block">Cold-Chain Temp:</span>
<span className="font-bold text-on-surface text-body-md">4.2°C (Optimal)</span>
</div>
<div>
<span className="text-on-surface-variant block">e-Sushrut Beds:</span>
<span className="font-bold text-on-surface text-body-md">4 / 6 Occupied</span>
</div>
<div>
<span className="text-on-surface-variant block">Doctor In-Charge:</span>
<span className="font-medium text-on-surface">Dr. V. Patil, MBBS</span>
</div>
<div>
<span className="text-on-surface-variant block">CHO Station:</span>
<span className="font-medium text-on-surface">Sunita Deshmukh</span>
</div>
</div>
{/* TFT Critical Flag Highlight */}
<div className="bg-red-50 border border-red-300 p-2 text-code-sm">
<div className="font-bold text-red-900 flex items-center justify-between">
<span>CRITICAL DEFICIT WARNING</span>
<span className="text-red-700">TFT Confidence 96.8%</span>
</div>
<div className="text-red-800 mt-1">
                    Rabies Immunoglobulin (RIG / ARV): <span className="font-bold">2 vials left</span>.
                    Canine rabies exposure cluster logged in Ward 4. Projected total stockout in <span className="font-bold">18.4 hours</span>.
                  </div>
</div>
<div className="flex items-center justify-between pt-1">
<span className="text-code-sm font-code-sm text-on-surface-variant">Recommended Donor: <span className="font-bold text-on-surface">Baramati SDH (42.6 km)</span></span>
<button className="bg-secondary text-on-secondary font-label-sm text-label-sm px-2 py-1 font-semibold hover:bg-blue-800">
                    OPEN MILP
                  </button>
</div>
</div>
</div>
</div>
{/* Bottom Telemetry Sub-Band: Fleet & Route Logistics */}
<div className="border-t border-outline-variant bg-surface-container-low p-2 grid grid-cols-2 sm:grid-cols-4 gap-2 font-code-sm text-code-sm">
<div className="border-r border-outline-variant pr-2">
<span className="text-on-surface-variant block">Active Redistribution Vectors:</span>
<span className="font-bold text-on-surface text-body-md font-code-sm">01 En-Route / 03 Queued</span>
</div>
<div className="border-r border-outline-variant pr-2">
<span className="text-on-surface-variant block">Average Route Latency:</span>
<span className="font-bold text-on-surface text-body-md font-code-sm">46.2 min (SH Corridors)</span>
</div>
<div className="border-r border-outline-variant pr-2">
<span className="text-on-surface-variant block">eVIN Sensors Online:</span>
<span className="font-bold text-emerald-700 text-body-md font-code-sm">188/192 (97.9%)</span>
</div>
<div>
<span className="text-on-surface-variant block">DPDP Audit Signature:</span>
<span className="font-bold text-on-surface text-body-md font-code-sm">HMAC-SHA256 OK</span>
</div>
</div>
</div>
)}
{/* RIGHT REGION: REAL-TIME TFT FORECASTING & ALERTS PANEL */}
{activeTab === "TFT Alerts & Logistics" && (
<div className="w-full flex flex-col bg-surface-container-lowest flex-1 max-w-4xl mx-auto border-x border-outline-variant shadow-sm">
{/* Panel Header */}
<div className="p-3 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<div>
<div className="font-headline-sm text-headline-sm text-on-surface flex items-center space-x-1.5">
<span className="material-symbols-outlined text-secondary">trending_up</span>
<span>TFT Early Warning Feed</span>
</div>
<div className="font-code-sm text-code-sm text-on-surface-variant">Quantile Loss: 0.042 • Horizon: 14 Days Ahead</div>
</div>
<span className="bg-surface-container border border-outline-variant px-1.5 py-0.5 font-code-sm text-code-sm text-on-surface">Auto-Refresh 10s</span>
</div>
{/* Alert Triage Filters */}
<div className="flex border-b border-outline-variant text-label-sm font-label-sm bg-surface">
<button className="flex-1 py-1.5 border-b-2 border-secondary font-bold text-secondary bg-surface-container-lowest text-center">
              Critical (&lt;72h) [1]
            </button>
<button className="flex-1 py-1.5 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface text-center">
              High Risk (&lt;7d) [3]
            </button>
<button className="flex-1 py-1.5 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface text-center">
              Cold-Chain [1]
            </button>
</div>
{/* Alert Feed Scrollable Container */}
<div className="p-space-sm space-y-space-sm overflow-y-auto max-h-[calc(100vh-14rem)]">
{/* Alert Card 1: Critical Depletion PHC Indapur */}
<div className="border-2 border-error bg-surface-container-lowest p-3 relative">
<div className="flex items-start justify-between">
<div className="flex items-center space-x-1.5">
<span className="w-2.5 h-2.5 bg-error"></span>
<span className="font-label-sm text-label-sm font-bold text-error uppercase">CRITICAL DEFICIT &lt; 18h</span>
</div>
<span className="font-code-sm text-code-sm bg-red-100 text-red-800 px-1 font-bold">NIN: MH-PUN-0842</span>
</div>
<div className="mt-2">
<div className="font-headline-sm text-headline-sm text-on-surface">PHC Indapur Rural</div>
<div className="font-body-sm text-body-sm text-on-surface mt-1">
<span className="font-semibold">Rabies Vaccine (ARV) &amp; Serum:</span> Stock depletion imminent.
                </div>
<div className="font-code-sm text-code-sm text-error font-medium mt-0.5">
                  Projected Surge: +340% due to canine cluster in Ward 4.
                </div>
</div>
<div className="mt-3 p-2 bg-surface-container border border-outline-variant text-code-sm font-code-sm">
<div className="text-on-surface-variant uppercase font-semibold">TFT Model Telemetry:</div>
<div className="flex justify-between mt-1">
<span>Current On-Hand:</span>
<span className="font-bold text-error">2 vials</span>
</div>
<div className="flex justify-between">
<span>Predicted 48h Demand:</span>
<span className="font-bold text-on-surface">48 vials</span>
</div>
<div className="flex justify-between">
<span>MILP Solution Source:</span>
<span className="font-bold text-secondary">Baramati SDH (Surplus 180)</span>
</div>
</div>
<div className="mt-3 flex items-center space-x-2">
<button className="flex-1 bg-primary hover:bg-slate-800 text-on-primary font-label-sm text-label-sm py-1.5 px-2 border border-outline font-semibold uppercase tracking-wider flex items-center justify-center space-x-1">
<span className="material-symbols-outlined">bolt</span>
<span>Authorize Lateral Transfer</span>
</button>
<button className="px-2 py-1.5 border border-outline-variant text-on-surface hover:bg-surface-container font-label-sm text-label-sm" title="View Patient Manifest">
<span className="material-symbols-outlined">description</span>
</button>
</div>
</div>
{/* Alert Card 2: Warning PHC Bhor */}
<div className="border border-amber-300 bg-surface-container-lowest p-3">
<div className="flex items-start justify-between">
<div className="flex items-center space-x-1.5">
<span className="w-2.5 h-2.5 bg-amber-500"></span>
<span className="font-label-sm text-label-sm font-bold text-amber-800 uppercase">WARNING: DEPLETION IN 5.2 DAYS</span>
</div>
<span className="font-code-sm text-code-sm bg-amber-100 text-amber-900 px-1">NIN: MH-PUN-0312</span>
</div>
<div className="mt-2">
<div className="font-headline-sm text-headline-sm text-on-surface">PHC Bhor Taluka Center</div>
<div className="font-body-sm text-body-sm text-on-surface mt-1">
<span className="font-semibold">Oxytocin 10 IU Ampoules:</span> Low reserve threshold.
                </div>
<div className="font-code-sm text-code-sm text-on-surface-variant mt-0.5">
                  Stock: 24 ampoules remaining. Normal maternal deliveries pipeline stalled from state depot.
                </div>
</div>
<div className="mt-2 p-1.5 bg-surface-container border border-outline-variant flex justify-between font-code-sm text-code-sm">
<span>MILP Donor Candidate:</span>
<span className="font-bold text-on-surface">Saswad SDH (ETA 31 min)</span>
</div>
<div className="mt-2 flex justify-end">
<button className="text-secondary font-label-sm text-label-sm hover:underline flex items-center space-x-1">
<span>Simulate Supply Redistribution</span>
<span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
{/* Alert Card 3: Cold-Chain IoT Excursion Waki CHC */}
<div className="border border-red-400 bg-red-50/50 p-3">
<div className="flex items-start justify-between">
<div className="flex items-center space-x-1.5">
<span className="material-symbols-outlined text-error">device_thermostat</span>
<span className="font-label-sm text-label-sm font-bold text-error uppercase">COLD-CHAIN EXCURSION BREACH</span>
</div>
<span className="font-code-sm text-code-sm bg-red-200 text-red-900 px-1 font-bold">SENSOR: ILR-02</span>
</div>
<div className="mt-2">
<div className="font-headline-sm text-headline-sm text-on-surface">Waki Community Health Centre</div>
<div className="font-code-sm text-code-sm text-error font-bold mt-1">
                  Temp Spiked: 9.4°C (Limit: +2.0°C to +8.0°C)
                </div>
<div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Duration: 22 minutes continuous breach. Backup generator automatic failover flagged offline.
                </div>
</div>
{/* Segmented Thermometer Indicator */}
<div className="mt-3 bg-surface-container-lowest p-2 border border-outline-variant">
<div className="flex justify-between text-code-sm font-code-sm mb-1">
<span>Safe Range (+2°C - +8°C)</span>
<span className="text-error font-bold">Current: +9.4°C</span>
</div>
<div className="w-full bg-slate-200 h-2 flex">
<div className="w-1/4 bg-blue-300"></div>
<div className="w-2/4 bg-emerald-400"></div>
<div className="w-1/4 bg-red-500"></div>
</div>
<div className="flex justify-between text-code-sm font-code-sm text-on-surface-variant mt-1">
<span>0°C</span>
<span>+2°C</span>
<span>+8°C</span>
<span>+12°C</span>
</div>
</div>
<div className="mt-2 flex items-center justify-between text-code-sm font-code-sm">
<span className="text-on-surface-variant">Auto-flagged for batch viability testing</span>
<button className="text-error font-bold hover:underline">Dispatch Maintenance</button>
</div>
</div>
{/* Dense Mini Data Table: District Critical Stock Matrix */}
<div className="border border-outline-variant bg-surface-container-lowest">
<div className="bg-surface-container-low px-2 py-1.5 border-b border-outline-variant font-label-sm text-label-sm font-bold text-on-surface">
                DISTRICT ESSENTIAL DRUG INDEX (PUNE REGION)
              </div>
<table className="w-full text-left font-body-sm text-body-sm border-collapse">
<thead>
<tr className="bg-surface text-on-surface-variant font-code-sm text-code-sm border-b border-outline-variant">
<th className="p-1.5 pl-2 font-bold">COMMODITY</th>
<th className="p-1.5 font-bold">STOCK</th>
<th className="p-1.5 font-bold">RUN-RATE</th>
<th className="p-1.5 font-bold">STATE</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant font-code-sm text-code-sm">
<tr className="hover:bg-surface-container">
<td className="p-1.5 pl-2 font-medium">Rabies ARV</td>
<td className="p-1.5 text-error font-bold">34 vials</td>
<td className="p-1.5">-8.4/day</td>
<td className="p-1.5"><span className="text-error font-bold">DEFICIT</span></td>
</tr>
<tr className="hover:bg-surface-container bg-surface-container-lowest">
<td className="p-1.5 pl-2 font-medium">Anti-Snake Venom</td>
<td className="p-1.5 font-bold">112 vials</td>
<td className="p-1.5">-3.1/day</td>
<td className="p-1.5"><span className="text-emerald-700">OPTIMAL</span></td>
</tr>
<tr className="hover:bg-surface-container">
<td className="p-1.5 pl-2 font-medium">Oxytocin 10 IU</td>
<td className="p-1.5 text-amber-700 font-bold">88 amps</td>
<td className="p-1.5">-14.2/day</td>
<td className="p-1.5"><span className="text-amber-700">LOW</span></td>
</tr>
<tr className="hover:bg-surface-container bg-surface-container-lowest">
<td className="p-1.5 pl-2 font-medium">Ceftriaxone 1g</td>
<td className="p-1.5 font-bold">420 vials</td>
<td className="p-1.5">-28/day</td>
<td className="p-1.5"><span className="text-emerald-700">OPTIMAL</span></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
)}
</div>
</main>
</div>
{/* ================= MARL + MILP REDISTRIBUTION AUTHORIZATION MODAL ================= */}
<div className="hidden fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-none flex items-center justify-center p-4" id="dispatchModal">
<div className="bg-surface-container-lowest border-2 border-primary w-full max-w-3xl shadow-none">
{/* Modal Header */}
<div className="bg-primary text-on-primary p-3 flex justify-between items-center border-b border-outline">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-amber-400">alt_route</span>
<div>
<span className="font-headline-sm text-headline-sm font-bold text-white block leading-none">MULTI-AGENT RL + MILP LATERAL DISPATCH MATRIX</span>
<span className="font-code-sm text-code-sm text-surface-variant leading-none mt-1 block">ALGORITHM: CP-LEX MILP SOLVER • CONVERGENCE: OPTIMAL (42ms)</span>
</div>
</div>
<button className="text-on-primary hover:text-surface-variant">
<span className="material-symbols-outlined">close</span>
</button>
</div>
{/* Modal Content Body */}
<div className="p-4 space-y-4">
{/* Route & Transfer Logistics Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-outline-variant p-3 bg-surface-container-low">
<div>
<span className="font-code-sm text-code-sm text-on-surface-variant block uppercase font-bold">Donor Facility (Surplus Source)</span>
<div className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Baramati Sub-District Hospital (SDH)</div>
<div className="font-code-sm text-code-sm text-on-surface-variant mt-1">
              Available Reserve: <span className="font-bold text-emerald-700">180 vials ARV</span> • Cold Box Ready: <span className="font-bold">4 units</span>
</div>
<div className="font-code-sm text-code-sm text-on-surface-variant">Location NIN: <span className="font-bold">MH-PUN-SDH-01</span></div>
</div>
<div className="border-t md:border-t-0 md:border-l border-outline-variant md:pl-3 pt-2 md:pt-0">
<span className="font-code-sm text-code-sm text-on-surface-variant block uppercase font-bold">Recipient Facility (Deficit Target)</span>
<div className="font-headline-sm text-headline-sm text-error mt-0.5">Indapur Primary Health Centre (PHC)</div>
<div className="font-code-sm text-code-sm text-on-surface-variant mt-1">
              Transfer Quota: <span className="font-bold text-error">60 vials (Rabies ARV)</span> • Deficit Clearance: <span className="font-bold text-emerald-700">100%</span>
</div>
<div className="font-code-sm text-code-sm text-on-surface-variant">Urgency Index: <span className="font-bold text-error">CRITICAL (Surge Cluster)</span></div>
</div>
</div>
{/* Vehicle & Transit Constraints */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-code-sm text-code-sm">
<div className="border border-outline-variant p-2 bg-surface-container">
<span className="text-on-surface-variant block">Vehicle Allocated:</span>
<span className="font-bold text-on-surface">EV Carrier MH-12-CZ-9912</span>
</div>
<div className="border border-outline-variant p-2 bg-surface-container">
<span className="text-on-surface-variant block">Carrier Pilot:</span>
<span className="font-bold text-on-surface">R. Shinde (ID: DRV-881)</span>
</div>
<div className="border border-outline-variant p-2 bg-surface-container">
<span className="text-on-surface-variant block">Transit Corridor:</span>
<span className="font-bold text-on-surface">SH-54 (42.6 km)</span>
</div>
<div className="border border-outline-variant p-2 bg-surface-container">
<span className="text-on-surface-variant block">Estimated Transit:</span>
<span className="font-bold text-secondary">44 mins (Live GPS)</span>
</div>
</div>
{/* FHIR R4 SupplyDelivery JSON Preview Payload */}
<div>
<div className="flex justify-between items-center mb-1">
<span className="font-label-sm text-label-sm text-on-surface font-bold uppercase">FHIR R4 SupplyDelivery JSON Manifest Preview:</span>
<span className="font-code-sm text-code-sm text-on-surface-variant">SNOMED CT: 424519002</span>
</div>
<pre className="bg-slate-900 text-emerald-400 p-2.5 font-code-sm text-code-sm overflow-x-auto border border-outline max-h-36 select-text">{`{
  "resourceType": "SupplyDelivery",
  "identifier": [{ "system": "https://nhm.gov.in/faile", "value": "DISP-2025-0549" }],
  "status": "in-progress",
  "patient": { "display": "Aggregated Community Reserve Indapur" },
  "supplier": { "reference": "Location/MH-SDH-01", "display": "Baramati SDH" },
  "destination": { "reference": "Location/MH-PHC-04", "display": "Indapur PHC" },
  "suppliedItem": {
    "itemCodeableConcept": {
      "coding": [{
        "system": "https://snomed.info/sct",
        "code": "424519002",
        "display": "Rabies vaccine"
      }]
    },
    "quantity": { "value": 60, "unit": "vial" }
  },
  "extension": [{
    "url": "http://mohfw.gov.in/fhir/StructureDefinition/coldchain-temp",
    "valueDecimal": 4.1
  }]
}`}</pre>
</div>
{/* Action / Authorization Bar */}
<div className="pt-2 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-2">
<div className="flex items-center space-x-2 text-code-sm font-code-sm text-on-surface-variant">
<span className="material-symbols-outlined text-emerald-600">verified_user</span>
<span>Digital Token: CMO-PUN-AUTH-909982 (DPDP Act Validated)</span>
</div>
<div className="flex space-x-2 w-full sm:w-auto">
<button className="flex-1 sm:flex-none border border-outline-variant px-3 py-1.5 text-on-surface font-label-sm text-label-sm hover:bg-surface-container">
              Cancel
            </button>
<button className="flex-1 sm:flex-none bg-secondary hover:bg-blue-800 text-on-secondary font-label-sm text-label-sm px-4 py-1.5 font-bold uppercase tracking-wider flex items-center justify-center space-x-1 border border-blue-900" id="dispatchConfirmBtn">
<span className="material-symbols-outlined">send</span>
<span>One-Click Authorize &amp; Dispatch (FHIR R4)</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/* ================= INTERACTIVE CHO FIELD MOBILE PWA VIEW (DRAWER / EMULATOR) ================= */}

{/* ANALYTICS & FEDERATED HEALTH TAB */}
{activeTab === "Analytics & Federated Health" && (
<div className="w-full flex flex-col bg-surface-container-lowest flex-1 max-w-7xl mx-auto p-4 space-y-4">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <FederatedMonitor />
    <ForecastChart />
  </div>
</div>
)}

{activeTab === "Field Node (CHO Mobile)" && (<div className="w-full sm:w-96 mx-auto bg-surface-container-lowest shadow-2xl flex flex-col flex-1 border border-outline-variant mt-4" id="choDrawer">
{/* Mobile Frame Outer Container */}
<div className="w-full h-full bg-surface border-l-2 border-primary flex flex-col shadow-none">
{/* Drawer Header */}
<div className="bg-primary text-on-primary p-2.5 flex items-center justify-between border-b border-outline">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-emerald-400">phone_android</span>
<span className="font-headline-sm text-headline-sm font-bold text-white">CHO Field PWA (Mobile View)</span>
</div>
<button className="text-on-primary hover:text-surface-variant">
<span className="material-symbols-outlined">close</span>
</button>
</div>
{/* Simulated Mobile Viewport Header (Ayushman Arogya Mandir) */}
<div className="bg-surface-container-low border-b border-outline-variant p-3">
<div className="flex items-center justify-between">
<span className="font-code-sm text-code-sm bg-emerald-100 text-emerald-900 px-1.5 py-0.5 font-bold">ONLINE • SYNC 2m AGO</span>
<span className="font-code-sm text-code-sm text-on-surface-variant">e-Sushrut v4.2</span>
</div>
<div className="font-headline-sm-mobile text-headline-sm-mobile text-on-surface font-bold mt-1">
          Ayushman Arogya Mandir
        </div>
<div className="font-body-sm text-body-sm text-on-surface-variant">
          SC-PHC Indapur Rural • CHO Sunita Deshmukh
        </div>
</div>
{/* Mobile Content Canvas (Scrollable) */}
<div className="flex-1 overflow-y-auto p-3 space-y-3">
{/* Module 1: 14-Day Auto-Virtual Indent Passbook */}
<div className="border border-outline-variant bg-surface-container-lowest p-2.5">
<div className="flex items-center justify-between border-b border-outline-variant pb-1.5 mb-2">
<span className="font-label-sm text-label-sm font-bold text-on-surface flex items-center space-x-1">
<span className="material-symbols-outlined text-secondary">receipt_long</span>
<span>14-Day Auto-Virtual Indent Passbook</span>
</span>
<span className="font-code-sm text-code-sm bg-blue-100 text-blue-800 px-1">AUTO-CALC</span>
</div>
<div className="space-y-1.5 font-code-sm text-code-sm">
{/* Indent Item 1 */}
<div className="flex items-center justify-between p-1.5 bg-red-50 border border-red-200">
<div>
<div className="font-bold text-on-surface">Rabies Vaccine (ARV)</div>
<div className="text-error font-medium">Req: 60 vials • Stockout Risk</div>
</div>
<span className="font-bold text-secondary bg-surface-container-lowest px-1.5 py-0.5 border border-secondary">
                Dispatched
              </span>
</div>
{/* Indent Item 2 */}
<div className="flex items-center justify-between p-1.5 bg-surface border border-outline-variant">
<div>
<div className="font-bold text-on-surface">ORS Packets (WHO Formula)</div>
<div className="text-on-surface-variant">Req: 400 pkts • Bal: 180</div>
</div>
<span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-300">
                Approved
              </span>
</div>
{/* Indent Item 3 */}
<div className="flex items-center justify-between p-1.5 bg-surface border border-outline-variant">
<div>
<div className="font-bold text-on-surface">IFA Tablets (Adult Blue)</div>
<div className="text-on-surface-variant">Req: 1,200 tabs • Bal: 350</div>
</div>
<span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-300">
                Approved
              </span>
</div>
</div>
<div className="mt-2 text-code-sm font-code-sm text-on-surface-variant text-right">
<span>Paper Ledger Elimination Rule Active</span>
</div>
</div>
{/* Module 2: Live eVIN IoT Cold-Chain Tracker */}
<div className="border border-outline-variant bg-surface-container-lowest p-2.5">
<div className="flex items-center justify-between border-b border-outline-variant pb-1.5 mb-2">
<span className="font-label-sm text-label-sm font-bold text-on-surface flex items-center space-x-1">
<span className="material-symbols-outlined text-blue-600">ac_unit</span>
<span>Live eVIN ILR Cold-Chain Sensor</span>
</span>
<span className="font-code-sm text-code-sm text-emerald-700 font-bold">4.1°C OPTIMAL</span>
</div>
<div className="bg-surface-container p-2 border border-outline-variant">
<div className="flex justify-between items-baseline">
<span className="font-code-sm text-code-sm text-on-surface-variant">Current Temperature:</span>
<span className="font-headline-md text-headline-md text-emerald-700 font-bold font-code-sm">+4.1°C</span>
</div>
<div className="text-code-sm font-code-sm text-on-surface-variant">Range Permitted: +2.0°C to +8.0°C</div>
{/* 60-Minute Sparkline SVG Graph */}
<div className="mt-2 h-14 w-full bg-surface-container-lowest border border-outline-variant p-1">
<svg className="w-full h-full" viewBox="0 0 200 40">
{/* Safe zone background */}
<rect fill="#dcfce7" height="24" opacity="0.5" width="200" x="0" y="8"></rect>
{/* Sparkline line */}
<polyline fill="none" points="0,20 20,21 40,19 60,22 80,18 100,20 120,21 140,19 160,20 180,18 200,19" stroke="#166534" strokeWidth="2"></polyline>
</svg>
</div>
<div className="flex justify-between text-code-sm font-code-sm text-on-surface-variant mt-1">
<span>-60m</span>
<span>No breaches in 12 hrs</span>
<span>Live</span>
</div>
</div>
</div>
{/* Module 3: Quick HMIS Attendance & Bed Tracker */}
<div className="border border-outline-variant bg-surface-container-lowest p-2.5">
<div className="flex items-center justify-between border-b border-outline-variant pb-1.5 mb-2">
<span className="font-label-sm text-label-sm font-bold text-on-surface flex items-center space-x-1">
<span className="material-symbols-outlined text-secondary">hotel</span>
<span>HMIS Beds &amp; OPD Telemetry</span>
</span>
<span className="font-code-sm text-code-sm bg-surface-container px-1 font-bold">API SYNCED</span>
</div>
<div className="grid grid-cols-2 gap-2 text-code-sm font-code-sm">
<div className="p-2 border border-outline-variant bg-surface">
<span className="text-on-surface-variant block">Available Beds:</span>
<span className="text-headline-sm text-headline-sm font-bold text-on-surface">4 / 6</span>
</div>
<div className="p-2 border border-outline-variant bg-surface">
<span className="text-on-surface-variant block">Oxygen Cylinders:</span>
<span className="text-headline-sm text-headline-sm font-bold text-on-surface">2 Full (D-Type)</span>
</div>
<div className="p-2 border border-outline-variant bg-surface">
<span className="text-on-surface-variant block">OPD Footfall Today:</span>
<span className="text-headline-sm text-headline-sm font-bold text-on-surface">38 Patients</span>
</div>
<div className="p-2 border border-outline-variant bg-surface">
<span className="text-on-surface-variant block">Immunizations Logged:</span>
<span className="text-headline-sm text-headline-sm font-bold text-on-surface">14 Infants</span>
</div>
</div>
<div className="mt-2.5">
<button className="w-full bg-primary text-on-primary py-1.5 font-label-sm text-label-sm font-bold uppercase tracking-wider hover:bg-surface-variant hover:text-on-surface transition-colors">
              Submit Daily HMIS Return (MoHFW)
            </button>
</div>
</div>
</div>
{/* BottomNavBar (Shared Component Contract inside Mobile Frame) */}
<nav className="bg-surface-container-lowest dark:bg-surface-container-lowest docked full-width bottom-0 z-50 border-t border-outline-variant dark:border-outline-variant flat no shadows flex justify-around items-center h-14 px-margin-compact">
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary bg-surface-container dark:bg-surface-container rounded px-3 py-1 font-label-sm text-label-sm" href="#">
<span className="material-symbols-outlined">receipt_long</span>
<span>Passbook</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant px-3 py-1 font-label-sm text-label-sm hover:bg-surface-container-high" href="#">
<span className="material-symbols-outlined">ac_unit</span>
<span>Cold-Chain</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant px-3 py-1 font-label-sm text-label-sm hover:bg-surface-container-high" href="#">
<span className="material-symbols-outlined">hotel</span>
<span>HMIS Beds</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant px-3 py-1 font-label-sm text-label-sm hover:bg-surface-container-high" href="#">
<span className="material-symbols-outlined">offline_pin</span>
<span>Sync Audit</span>
</a>
</nav>
</div>
</div>
)}
{/* ================= REGULATORY, AUDIT & DPDP ACT 2023 FOOTER ================= */}
<footer className="fixed bottom-0 left-0 w-full h-7 bg-surface-container-lowest border-t border-outline-variant px-margin flex items-center justify-between z-40 text-code-sm font-code-sm text-on-surface-variant">
<div className="flex items-center space-x-3 truncate">
<span className="font-bold text-on-surface">MoHFW NODE ID: IN-MH-WST-009</span>
<span className="hidden sm:inline">|</span>
<span className="hidden sm:inline">DPDP ACT (2023) COMPLIANT DATA ENCLAVE</span>
<span className="hidden md:inline">|</span>
<span className="hidden md:inline text-emerald-700 font-semibold">LOCAL ENCRYPTED CACHE: ACTIVE (OFFLINE READY)</span>
</div>
<div className="flex items-center space-x-3 text-on-surface shrink-0">
<span className="hidden lg:inline text-on-surface-variant">NATIONAL HEALTH DATA MANAGEMENT POLICY v2.1</span>
<span>TERMS OF SERVICE</span>
<span>PRIVACY POLICY (DPDP 2023)</span>
</div>
</footer>
{/* ================= INLINE SCRIPT LOGIC FOR INTERACTION ================= */}


    </div>
  );
}
