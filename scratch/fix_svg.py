import re

with open('app/page.tsx', 'r') as f:
    code = f.read()

# Fix React SVG DOM properties
replacements = {
    'font-family=': 'fontFamily=',
    'font-size=': 'fontSize=',
    'font-weight=': 'fontWeight=',
    'marker-end=': 'markerEnd=',
    'text-anchor=': 'textAnchor=',
    'stroke-width=': 'strokeWidth=',
    'fill-opacity=': 'fillOpacity=',
    'stroke-opacity=': 'strokeOpacity=',
    'stroke-dasharray=': 'strokeDasharray=',
    'stroke-linecap=': 'strokeLinecap=',
    'stroke-linejoin=': 'strokeLinejoin=',
}

for old, new in replacements.items():
    code = code.replace(old, new)

with open('app/page.tsx', 'w') as f:
    f.write(code)
