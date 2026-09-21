import re

with open('app/page.tsx', 'r') as f:
    code = f.read()

# Remove old nav from header
code = re.sub(
    r'<nav className="hidden xl:flex items-center space-x-gutter">.*?</nav>',
    '',
    code,
    flags=re.DOTALL
)

# Fix javascript: href
code = code.replace(
    'href="javascript:toggleCHODrawer()"',
    'href="#" onClick={(e) => { e.preventDefault(); setActiveTab("Field Node (CHO Mobile)"); }}'
)

with open('app/page.tsx', 'w') as f:
    f.write(code)
