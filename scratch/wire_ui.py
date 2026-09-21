with open('app/page.tsx', 'r') as f:
    code = f.read()

import re

# Find the Alert Card 1 block
pattern = r'(?s)({\/\*\s*Alert Card 1: Critical Depletion PHC Indapur\s*\*\/})(.*?)(<div className="flex justify-between mt-3 bg-error-container text-on-error-container p-2 font-label-sm border border-error">)'

# We will just replace a segment of the file with the dynamic one
replacement = r'''{/* Alert Card 1: Dynamic Data From TFT Model */}
{prediction && prediction.prediction && (
<div className={`border-2 ${prediction.prediction.status === "CRITICAL" ? "border-error" : "border-amber-500"} bg-surface-container-lowest p-3 relative`}>
<div className="flex items-start justify-between">
<div className="flex items-center space-x-1.5">
<span className={`w-2.5 h-2.5 ${prediction.prediction.status === "CRITICAL" ? "bg-error" : "bg-amber-500"}`}></span>
<span className={`font-label-sm text-label-sm font-bold uppercase ${prediction.prediction.status === "CRITICAL" ? "text-error" : "text-amber-500"}`}>{prediction.prediction.status} DEFICIT &lt; {Math.round(prediction.prediction.estimated_depletion_days * 24)}h</span>
</div>
<span className="font-code-sm text-code-sm bg-red-100 text-red-800 px-1 font-bold">NIN: {prediction.facility_id}</span>
</div>
<div className="mt-2">
<div className="font-headline-sm text-headline-sm text-on-surface">PHC Node {prediction.facility_id}</div>
<div className="font-body-sm text-body-sm text-on-surface mt-1">
<span className="font-semibold">{prediction.prediction.critical_item}:</span> Stock depletion imminent.
                </div>
<div className="font-code-sm text-code-sm text-error font-medium mt-0.5">
                  Projected local demand spike identified.
                </div>
</div>
<div className="mt-3 p-2 bg-surface-container border border-outline-variant text-code-sm font-code-sm">
<div className="text-on-surface-variant uppercase font-semibold">TFT Model Telemetry:</div>
<div className="flex justify-between mt-1">
<span>Current On-Hand:</span>
<span className="font-bold text-error">{prediction.prediction.stock_on_hand} units</span>
</div>
<div className="flex justify-between">
<span>Predicted Daily Demand:</span>
<span className="font-bold text-on-surface">{prediction.prediction.daily_consumption} units</span>
</div>
<div className="flex justify-between">
<span>MILP Solution Source:</span>
<span className="font-bold text-emerald-700">Hub (Surplus {prediction.prediction.nearest_hub_surplus})</span>
</div>
<div className="flex justify-between">
<span>Transport Distance:</span>
<span className="font-bold text-on-surface">{prediction.prediction.hub_distance_km} km</span>
</div>
</div>
{/* Action Button */}
<button className="w-full mt-3 border border-outline-variant py-2 flex items-center justify-center space-x-2 hover:bg-surface-container transition-colors text-on-surface font-label-md font-bold uppercase">
<span className="material-symbols-outlined text-base">bolt</span>
<span>AUTHORIZE LATERAL TRANSFER</span>
<span className="material-symbols-outlined text-base border-l border-outline-variant pl-2 ml-2">article</span>
</button>
</div>
)}
'''

code = re.sub(r'\{\/\*\s*Alert Card 1: Critical Depletion PHC Indapur\s*\*\/\}.*?\{\/\*\s*Alert Card 2: High Risk Warning\s*\*\/\}', replacement + '\n{/* Alert Card 2: High Risk Warning */}', code, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(code)
