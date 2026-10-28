const fs = require('fs');
let c = fs.readFileSync('src/storefront/components/product/ProductCard.jsx', 'utf8');
c = c.replace(/const formattedPrice = new Intl\.NumberFormat\('en-US'\)\.format\(price\);/g, '');
c = c.replace(/\{formattedPrice\} BDT/g, '{formatCurrency(price)}');
c = c.replace(/EMI \{emi\} BDT/g, 'EMI {formatCurrency(emi)}');
c = c.replace(/৳ \{formattedPrice\}/g, '{formatCurrency(price)}');
// Note the unicode '৳' may not match if the original file has ' 3'. I'll just use regex.
c = c.replace(/[^\x00-\x7F]*\s*\{formattedPrice\}/g, '{formatCurrency(price)}');
c = c.replace(/import \{ useStorefrontTheme \} from '\.\.\/\.\.\/context\/StorefrontThemeContext';/g, "import { useStorefrontTheme } from '../../context/StorefrontThemeContext';\nimport { formatCurrency } from '../../utils/formatCurrency';");
fs.writeFileSync('src/storefront/components/product/ProductCard.jsx', c);
console.log('patched');
