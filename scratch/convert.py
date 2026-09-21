import re
html = open('stitch_screen.html').read()
body_match = re.search(r'<body[^>]*>(.*)</body>', html, re.DOTALL)
body = body_match.group(1) if body_match else ''

# Convert standard HTML to JSX
body = body.replace('class=', 'className=')
body = body.replace('viewbox=', 'viewBox=')
body = body.replace('stroke-width=', 'strokeWidth=')
body = body.replace('stroke-dasharray=', 'strokeDasharray=')
body = body.replace('stroke-dashoffset=', 'strokeDashoffset=')
body = body.replace('stroke-linecap=', 'strokeLinecap=')
body = body.replace('stroke-linejoin=', 'strokeLinejoin=')
body = body.replace('fill-rule=', 'fillRule=')
body = body.replace('clip-rule=', 'clipRule=')
body = body.replace('patternunits=', 'patternUnits=')
body = body.replace('markerheight=', 'markerHeight=')
body = body.replace('markerwidth=', 'markerWidth=')
body = body.replace('refx=', 'refX=')
body = body.replace('refy=', 'refY=')
body = body.replace('<!--', '{/*').replace('-->', '*/}')
body = re.sub(r'<input([^>]*[^/])>', r'<input\1 />', body)
body = re.sub(r'<img([^>]*[^/])>', r'<img\1 />', body)
body = re.sub(r'<hr([^>]*[^/])>', r'<hr\1 />', body)
body = re.sub(r'style="([^"]*)"', lambda m: 'style={{' + ', '.join([f"'{k.strip()}': '{v.strip()}'" for k, v in [x.split(':') for x in m.group(1).split(';') if ':' in x]]) + '}}', body)


react_code = f'''"use client";
import {{ useState, useEffect }} from "react";

export default function Home() {{
  const [facility, setFacility] = useState("PHC_01");
  const [inventory, setInventory] = useState<any[]>([]);
  const [footfall, setFootfall] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<any>(null);

  const API_URL = "http://localhost:8000";

  const fetchData = async () => {{
    try {{
      // Fetch Inventory
      const invRes = await fetch(`${{API_URL}}/api/e-aushadhi/inventory-report?facility_id=${{facility}}`);
      if (invRes.ok) {{
        const invData = await invRes.json();
        if (invData.inventoryListing && invData.inventoryListing.length > 0) {{
          setInventory(invData.inventoryListing.map((lst: any) => lst.items[0]));
        }} else {{ setInventory([]); }}
      }}
      // Fetch HMIS Footfall
      const hmisRes = await fetch(`${{API_URL}}/api/e-sushrut/hmis?facility_id=${{facility}}`);
      if (hmisRes.ok) setFootfall(await hmisRes.json());

      // Fetch EWS Prediction
      const predRes = await fetch(`${{API_URL}}/api/ews/predictions?facility_id=${{facility}}`);
      if (predRes.ok) {{
        const predData = await predRes.json();
        setPrediction(predData.prediction);
      }}
    }} catch (error) {{ console.error("Error fetching data:", error); }}
  }};

  useEffect(() => {{ fetchData(); }}, [facility]);

  return (
    <div className="bg-surface font-sans text-on-surface w-full min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-on-primary">
      {{/* The JSX converted from Stitch */}}
      {body}
    </div>
  );
}}
'''

with open('app/page.tsx', 'w') as f:
    f.write(react_code)
