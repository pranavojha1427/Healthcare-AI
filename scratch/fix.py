import re
with open('app/page.tsx', 'r') as f:
    code = f.read()

# Remove onclick handlers
code = re.sub(r' onclick="[^"]+"', '', code)

# Remove the inline script block
code = re.sub(r'<script>.*?</script>', '', code, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(code)
