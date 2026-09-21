import re

with open('app/dashboard/manager/page.tsx', 'r') as f:
    code = f.read()

# Add MapWrapper import
if 'MapWrapper' not in code:
    code = code.replace(
        'import { useState, useEffect } from "react";', 
        'import { useState, useEffect } from "react";\nimport MapWrapper from "../../../components/MapWrapper";\nimport FederatedMonitor from "../../../components/FederatedMonitor";\nimport ForecastChart from "../../../components/ForecastChart";'
    )

# Replace SVG map with MapWrapper
code = re.sub(
    r'<svg className="w-full h-full absolute inset-0".*?</svg>', 
    '<div className="w-full h-full absolute inset-0 z-0"><MapWrapper /></div>', 
    code, 
    flags=re.DOTALL
)

# Also rename the function to ManagerDashboard instead of Home
code = code.replace('export default function Home()', 'export default function ManagerDashboard()')

# Also, we should add a new Tab for Analytics
code = code.replace(
    "{['Geospatial Map', 'TFT Alerts & Logistics', 'Field Node (CHO Mobile)'].map(tab => (",
    "{['Geospatial Map', 'TFT Alerts & Logistics', 'Analytics & Federated Health'].map(tab => ("
)

# Now inject the Analytics Tab view
analytics_view = '''
{/* ANALYTICS & FEDERATED HEALTH TAB */}
{activeTab === "Analytics & Federated Health" && (
<div className="w-full flex flex-col bg-surface-container-lowest flex-1 max-w-7xl mx-auto p-4 space-y-4">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <FederatedMonitor />
    <ForecastChart />
  </div>
</div>
)}
'''
# Insert before "Field Node (CHO Mobile)" condition
code = code.replace(
    '{activeTab === "Field Node (CHO Mobile)" && (',
    analytics_view + '\n{activeTab === "Field Node (CHO Mobile)" && ('
)

with open('app/dashboard/manager/page.tsx', 'w') as f:
    f.write(code)
