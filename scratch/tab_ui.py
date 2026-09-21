import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Add `activeTab` to state
content = content.replace(
    'const [prediction, setPrediction] = useState<any>(null);',
    'const [prediction, setPrediction] = useState<any>(null);\n  const [activeTab, setActiveTab] = useState("Geospatial Map");'
)

# 2. Add Tab Bar below the Sub-Bar
tab_bar_jsx = """
        {/* NEW TAB BAR */}
        <div className="flex border-b border-outline-variant bg-surface-container-low px-4 pt-2 space-x-6 overflow-x-auto">
          {['Geospatial Map', 'TFT Alerts & Logistics', 'Field Node (CHO Mobile)'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`pb-2 font-headline-sm whitespace-nowrap ${activeTab === tab ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              {tab}
            </button>
          ))}
        </div>
"""
content = content.replace('{/* Sub-Bar: Command Stage Metadata & Instant Filters */}', tab_bar_jsx + '\n{/* Sub-Bar: Command Stage Metadata & Instant Filters */}')

# 3. Modify Grid to be conditional based on activeTab
content = content.replace(
    '<div className="grid grid-cols-1 xl:grid-cols-12 gap-0 flex-1 min-h-[calc(100vh-8.5rem)]">',
    '<div className="flex-1 w-full flex flex-col min-h-[calc(100vh-8.5rem)]">'
)

# Map Canvas
content = content.replace(
    '{/* GEOSPATIAL MAP CANVAS (Col 8) */}',
    '{/* GEOSPATIAL MAP CANVAS */}\n{activeTab === "Geospatial Map" && ('
)
content = content.replace(
    '<div className="xl:col-span-8 flex flex-col border-r border-outline-variant bg-surface-container-lowest relative">',
    '<div className="w-full flex flex-col bg-surface-container-lowest relative flex-1">'
)
# Close Map Canvas Condition (Right before RIGHT REGION)
content = content.replace(
    '{/* RIGHT REGION: REAL-TIME TFT FORECASTING & ALERTS PANEL (Col 4) */}',
    ')}\n{/* RIGHT REGION: REAL-TIME TFT FORECASTING & ALERTS PANEL */}\n{activeTab === "TFT Alerts & Logistics" && ('
)
# Right Region
content = content.replace(
    '<div className="xl:col-span-4 flex flex-col bg-surface-container-lowest">',
    '<div className="w-full flex flex-col bg-surface-container-lowest flex-1 max-w-4xl mx-auto border-x border-outline-variant shadow-sm">'
)
# Close Right Region Condition (Right before MARL + MILP REDISTRIBUTION AUTHORIZATION MODAL)
content = content.replace(
    '{/* ================= MARL + MILP REDISTRIBUTION AUTHORIZATION MODAL ================= */}',
    ')}\n{/* ================= MARL + MILP REDISTRIBUTION AUTHORIZATION MODAL ================= */}'
)

# Move the Mobile Drawer into its own tab instead of fixed overlay
content = content.replace(
    '<div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-surface-container-lowest shadow-2xl z-50 flex flex-col transform transition-transform duration-300 hidden" id="choDrawer">',
    '{activeTab === "Field Node (CHO Mobile)" && (<div className="w-full sm:w-96 mx-auto bg-surface-container-lowest shadow-2xl flex flex-col flex-1 border border-outline-variant mt-4">'
)
content = content.replace(
    '{/* ================= REGULATORY, AUDIT & DPDP ACT 2023 FOOTER ================= */}',
    ')}\n{/* ================= REGULATORY, AUDIT & DPDP ACT 2023 FOOTER ================= */}'
)

with open('app/page.tsx', 'w') as f:
    f.write(content)
