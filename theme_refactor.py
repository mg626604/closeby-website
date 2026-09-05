import os
import re

DIR = 'E:/closeby website/src'

REPLACEMENTS = [
    # Backgrounds
    (r'\bbg-slate-950\b', 'bg-slate-50 dark:bg-slate-950'),
    (r'\bbg-slate-900/60\b', 'bg-white/80 dark:bg-slate-900/60'),
    (r'\bbg-slate-900/80\b', 'bg-white/90 dark:bg-slate-900/80'),
    (r'\bbg-slate-900/90\b', 'bg-white dark:bg-slate-900/90'),
    (r'\bbg-slate-900/40\b', 'bg-white/60 dark:bg-slate-900/40'),
    (r'\bbg-slate-900\b', 'bg-white dark:bg-slate-900'),
    (r'\bbg-slate-800/90\b', 'bg-slate-100/90 dark:bg-slate-800/90'),
    (r'\bbg-slate-800/60\b', 'bg-slate-100/80 dark:bg-slate-800/60'),
    (r'\bbg-slate-800\b', 'bg-slate-100 dark:bg-slate-800'),
    (r'\bbg-slate-700/80\b', 'bg-slate-200/80 dark:bg-slate-700/80'),
    (r'\bbg-slate-700\b', 'bg-slate-200 dark:bg-slate-700'),
    
    # Borders
    (r'\bborder-slate-800\b', 'border-slate-200 dark:border-slate-800'),
    (r'\bborder-slate-700/80\b', 'border-slate-300/80 dark:border-slate-700/80'),
    (r'\bborder-slate-700/60\b', 'border-slate-300/60 dark:border-slate-700/60'),
    (r'\bborder-slate-700/50\b', 'border-slate-300/50 dark:border-slate-700/50'),
    (r'\bborder-slate-700/40\b', 'border-slate-300/40 dark:border-slate-700/40'),
    (r'\bborder-slate-700\b', 'border-slate-300 dark:border-slate-700'),
    (r'\bborder-slate-600\b', 'border-slate-400 dark:border-slate-600'),
    
    # Text Colors
    (r'\btext-slate-100\b', 'text-slate-900 dark:text-slate-100'),
    (r'\btext-slate-200\b', 'text-slate-800 dark:text-slate-200'),
    (r'\btext-slate-300\b', 'text-slate-700 dark:text-slate-300'),
    (r'\btext-slate-400\b', 'text-slate-600 dark:text-slate-400'),
    (r'\btext-slate-500\b', 'text-slate-500 dark:text-slate-500'),
]

def modify_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for pat, repl in REPLACEMENTS:
        # Avoid double replacement if script is run twice
        if 'dark:' not in repl or 'dark:' not in content:
            content = re.sub(pat, repl, content)
        
    # Replace text-white safely
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        if 'text-white' in line and not any(btn_bg in line for btn_bg in ['bg-red', 'bg-emerald', 'bg-blue', 'bg-amber', 'bg-purple', 'bg-gradient', 'bg-teal']):
            if 'dark:text-white' not in line:
                line = re.sub(r'\btext-white\b', 'text-slate-900 dark:text-white', line)
        new_lines.append(line)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))

for root, dirs, files in os.walk(DIR):
    for file in files:
        if file.endswith('.jsx'):
            modify_file(os.path.join(root, file))
