const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const files = walkSync('src/storefront', []);
let replacedCount = 0;

files.forEach(file => {
  if (file.includes('formatCurrency.js')) return;

  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. \${amount.toLocaleString('en-US', ...)} -> {formatCurrency(amount)}
  // using regex to match \$\{\s*(.*?)\.toLocaleString\(.*?\)\s*\}
  content = content.replace(/\$\{\s*(.*?)\.toLocaleString\([^)]*\)\s*\}/g, '{formatCurrency($1)}');
  
  // 2. {amount.toLocaleString(...)} BDT -> {formatCurrency(amount)}
  content = content.replace(/\{\s*(.*?)\.toLocaleString\([^)]*\)\s*\}\s*BDT/g, '{formatCurrency($1)}');

  // 3. ' BDT' when attached to a variable
  content = content.replace(/\+\s*' BDT'/g, '');

  if (content !== originalContent) {
    // Determine the relative path back to utils/formatCurrency
    const depth = file.split(path.sep).length - 3; // src/storefront/something -> 1
    let relativePath = '';
    if (depth <= 0) relativePath = './utils/formatCurrency';
    else if (depth === 1) relativePath = '../utils/formatCurrency';
    else if (depth === 2) relativePath = '../../utils/formatCurrency';
    else if (depth === 3) relativePath = '../../../utils/formatCurrency';

    // check if it has import already
    if (!content.includes('formatCurrency')) {
      content = `import { formatCurrency } from '${relativePath}';\n` + content;
    } else {
      // it might just have the function call but no import because of the replace
      if (!content.includes('import { formatCurrency }')) {
        content = `import { formatCurrency } from '${relativePath}';\n` + content;
      }
    }
    
    fs.writeFileSync(file, content, 'utf8');
    replacedCount++;
    console.log('Patched: ' + file);
  }
});

console.log('Total files patched: ' + replacedCount);
