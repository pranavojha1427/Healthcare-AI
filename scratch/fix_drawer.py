with open('app/page.tsx', 'r') as f:
    code = f.read()

code = code.replace(
    '<div className="hidden fixed inset-y-0 right-0 z-[100] w-full max-w-[420px] bg-slate-900/40 backdrop-blur-none flex justify-end" id="choDrawer">',
    '{activeTab === "Field Node (CHO Mobile)" && (<div className="w-full sm:w-96 mx-auto bg-surface-container-lowest shadow-2xl flex flex-col flex-1 border border-outline-variant mt-4" id="choDrawer">'
)

with open('app/page.tsx', 'w') as f:
    f.write(code)
