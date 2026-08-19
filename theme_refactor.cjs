const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'admin');

const replacements = [
  // Backgrounds
  { regex: /bg-white/g, replacement: 'bg-surface' },
  { regex: /bg-\[#F7F5F2\]/g, replacement: 'bg-background' },
  { regex: /bg-\[#F7F7FC\]/g, replacement: 'bg-background' },
  { regex: /bg-stone-50(?!0)/g, replacement: 'bg-background' },
  { regex: /bg-gray-50(?!0)/g, replacement: 'bg-background' },
  { regex: /bg-indigo-50/g, replacement: 'bg-primary-soft' },
  { regex: /bg-\[#EEF0FF\]/g, replacement: 'bg-primary-soft' },
  { regex: /bg-\[#E8FFF3\]/g, replacement: 'bg-success-soft' },
  { regex: /bg-\[#20C77A\]/g, replacement: 'bg-success' },
  
  // Texts
  { regex: /text-stone-900/g, replacement: 'text-text-primary' },
  { regex: /text-gray-900/g, replacement: 'text-text-primary' },
  { regex: /text-\[#1A1A1A\]/g, replacement: 'text-text-primary' },
  { regex: /text-\[#111A4A\]/g, replacement: 'text-text-primary' },
  
  { regex: /text-stone-600/g, replacement: 'text-text-secondary' },
  { regex: /text-stone-700/g, replacement: 'text-text-secondary' },
  { regex: /text-gray-600/g, replacement: 'text-text-secondary' },
  { regex: /text-gray-700/g, replacement: 'text-text-secondary' },
  
  { regex: /text-stone-500/g, replacement: 'text-text-muted' },
  { regex: /text-gray-500/g, replacement: 'text-text-muted' },
  { regex: /text-\[#7C849F\]/g, replacement: 'text-text-muted' },
  
  { regex: /text-stone-400/g, replacement: 'text-text-muted' },
  { regex: /text-gray-400/g, replacement: 'text-text-muted' },

  // Borders
  { regex: /border-stone-200/g, replacement: 'border-border' },
  { regex: /border-gray-200/g, replacement: 'border-border' },
  { regex: /border-\[#E5E7F2\]/g, replacement: 'border-border' },
  { regex: /border-stone-300/g, replacement: 'border-border-hover' },
  { regex: /border-gray-300/g, replacement: 'border-border-hover' },
  
  // Primary Color
  { regex: /bg-stone-900/g, replacement: 'bg-primary' },
  { regex: /bg-indigo-600/g, replacement: 'bg-primary' },
  { regex: /bg-blue-600/g, replacement: 'bg-primary' },
  { regex: /bg-\[#4F46FF\]/g, replacement: 'bg-primary' },
  
  { regex: /text-indigo-600/g, replacement: 'text-primary' },
  { regex: /text-blue-600/g, replacement: 'text-primary' },
  { regex: /text-\[#4F46FF\]/g, replacement: 'text-primary' },
  
  { regex: /border-indigo-600/g, replacement: 'border-primary' },
  { regex: /border-\[#4F46FF\]/g, replacement: 'border-primary' },
  
  { regex: /hover:bg-stone-800/g, replacement: 'hover:bg-primary-hover' },
  { regex: /hover:bg-indigo-700/g, replacement: 'hover:bg-primary-hover' },
  
  // Focus States
  { regex: /focus:border-indigo-500/g, replacement: 'focus:border-primary' },
  { regex: /focus:ring-indigo-500/g, replacement: 'focus:ring-primary' },
  { regex: /focus:border-\[#4F46FF\]/g, replacement: 'focus:border-primary' },
  { regex: /focus:ring-\[#4F46FF\]/g, replacement: 'focus:ring-primary' },
  { regex: /focus:border-stone-400/g, replacement: 'focus:border-primary' },
  
  // Status Colors (Success, Warning, Danger)
  { regex: /text-green-600/g, replacement: 'text-success' },
  { regex: /text-green-700/g, replacement: 'text-success' },
  { regex: /bg-green-100/g, replacement: 'bg-success-soft' },
  { regex: /bg-green-50/g, replacement: 'bg-success-soft' },
  
  { regex: /text-amber-600/g, replacement: 'text-warning' },
  { regex: /text-amber-700/g, replacement: 'text-warning' },
  { regex: /bg-amber-100/g, replacement: 'bg-warning-soft' },
  { regex: /bg-amber-50/g, replacement: 'bg-warning-soft' },
  
  { regex: /text-red-600/g, replacement: 'text-danger' },
  { regex: /text-red-500/g, replacement: 'text-danger' },
  { regex: /bg-red-100/g, replacement: 'bg-danger-soft' },
  { regex: /bg-red-50/g, replacement: 'bg-danger-soft' },

  // Shadows
  { regex: /shadow-sm/g, replacement: 'shadow-sm' }, // Keep standard, it's defined in index.css
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

console.log('Starting theme refactor...');
processDirectory(targetDir);
console.log('Theme refactor complete!');
