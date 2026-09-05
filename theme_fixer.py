import os
import re

DIR = 'E:/closeby website/src'

def fix_pseudo_classes(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find patterns like:  hover:bg-slate-200 dark:bg-slate-700
    # and replace with:  hover:bg-slate-200 dark:hover:bg-slate-700
    
    # This regex looks for (hover|focus|active): followed by a class, then space, then dark:, then the broken class without prefix
    # Actually, it's easier: 
    # hover:bg-slate-\d+ dark:bg-slate-\d+ -> hover:bg-slate-... dark:hover:bg-slate-...
    
    pat1 = r'(hover|focus|active):([a-z0-9\-]+/[0-9]+|[a-z0-9\-]+)\s+dark:([a-z0-9\-]+/[0-9]+|[a-z0-9\-]+)'
    
    def replacer(match):
        pseudo = match.group(1)
        light_class = match.group(2)
        dark_class = match.group(3)
        
        # If dark_class doesn't have the pseudo, add it
        if pseudo not in dark_class:
            return f"{pseudo}:{light_class} dark:{pseudo}:{dark_class}"
        return match.group(0)
    
    new_content = re.sub(pat1, replacer, content)
    
    # Also we might have text: hover:text-slate-900 dark:text-white
    # The regex pat1 handles any class name!
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

for root, dirs, files in os.walk(DIR):
    for file in files:
        if file.endswith('.jsx'):
            fix_pseudo_classes(os.path.join(root, file))
