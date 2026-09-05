import os
import re

DIR = 'E:/closeby website/src'

# Format: (Regex pattern to find exact tailwind class not preceded by dark: wait, Tailwind uses \b but we must be careful with :)
# Using negative lookbehind (?<!dark:) to prevent double replacement!

REPLACEMENTS = [
    # Backgrounds
    (r'(?<!dark:)bg-slate-950', 'bg-slate-50 dark:bg-slate-950'),
    (r'(?<!dark:)bg-slate-900/60', 'bg-white/80 dark:bg-slate-900/60'),
    (r'(?<!dark:)bg-slate-900/80', 'bg-white/90 dark:bg-slate-900/80'),
    (r'(?<!dark:)bg-slate-900/90', 'bg-white dark:bg-slate-900/90'),
    (r'(?<!dark:)bg-slate-900/40', 'bg-white/60 dark:bg-slate-900/40'),
    (r'(?<!dark:)bg-slate-900(?![/\-])', 'bg-white dark:bg-slate-900'),
    
    (r'(?<!dark:)bg-slate-800/90', 'bg-slate-100/90 dark:bg-slate-800/90'),
    (r'(?<!dark:)bg-slate-800/60', 'bg-white/80 dark:bg-slate-800/60'),
    (r'(?<!dark:)bg-slate-800(?![/\-])', 'bg-slate-100 dark:bg-slate-800'),
    (r'(?<!dark:)bg-slate-700/80', 'bg-slate-200/80 dark:bg-slate-700/80'),
    (r'(?<!dark:)bg-slate-700/60', 'bg-slate-200/60 dark:bg-slate-700/60'),
    (r'(?<!dark:)bg-slate-700(?![/\-])', 'bg-slate-200 dark:bg-slate-700'),
    
    # Borders
    (r'(?<!dark:)border-slate-800', 'border-slate-200 dark:border-slate-800'),
    (r'(?<!dark:)border-slate-700/80', 'border-slate-300/80 dark:border-slate-700/80'),
    (r'(?<!dark:)border-slate-700/60', 'border-slate-300/60 dark:border-slate-700/60'),
    (r'(?<!dark:)border-slate-700/50', 'border-slate-300/50 dark:border-slate-700/50'),
    (r'(?<!dark:)border-slate-700/40', 'border-slate-300/40 dark:border-slate-700/40'),
    (r'(?<!dark:)border-slate-700(?![/\-])', 'border-slate-300 dark:border-slate-700'),
    (r'(?<!dark:)border-slate-600', 'border-slate-400 dark:border-slate-600'),
    
    # Text Colors
    (r'(?<!dark:)text-slate-100', 'text-slate-900 dark:text-slate-100'),
    (r'(?<!dark:)text-slate-200', 'text-slate-800 dark:text-slate-200'),
    (r'(?<!dark:)text-slate-300', 'text-slate-700 dark:text-slate-300'),
    (r'(?<!dark:)text-slate-400', 'text-slate-600 dark:text-slate-400'),
    (r'(?<!dark:)text-slate-500', 'text-slate-500 dark:text-slate-500'),
]

def modify_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for pat, repl in REPLACEMENTS:
        content = re.sub(pat, repl, content)
        
    # Extra pass for text-white where not on buttons
    lines = content.split('\n')
    new_lines = []
    
    # Don't touch these buttons
    btn_bgs = ['bg-red', 'bg-emerald', 'bg-blue', 'bg-amber', 'bg-purple', 'bg-gradient', 'bg-teal', 'text-[#ffffff]']
    
    for line in lines:
        if 'text-white' in line and not any(btn in line for btn in btn_bgs):
            # Replace cautiously using negative lookbehind
            line = re.sub(r'(?<!dark:)text-white', 'text-slate-900 dark:text-white', line)
            
        new_lines.append(line)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))

for root, dirs, files in os.walk(DIR):
    for file in files:
        if file.endswith('.jsx'):
            modify_file(os.path.join(root, file))
