const fs = require('fs');

let content = fs.readFileSync('src/admin/components/commerce/products/ProductToolbar.jsx', 'utf8');

// Add import
if (!content.includes('PermissionGuard')) {
  content = content.replace(
    "import { FiSearch, FiFilter, FiPlus, FiGrid, FiList, FiDownload, FiUpload } from 'react-icons/fi';",
    "import { FiSearch, FiFilter, FiPlus, FiGrid, FiList, FiDownload, FiUpload } from 'react-icons/fi';\nimport { PermissionGuard } from '../../../components/rbac/Guards';"
  );
}

// Wrap Create Product
content = content.replace(
  /<button\s+onClick=\{onCreate\}[\s\S]*?Create Product\s+<\/button>/,
  `<PermissionGuard permission="products.create">
            <button
              onClick={onCreate}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <FiPlus size={16} />
              Create Product
            </button>
          </PermissionGuard>`
);

// Wrap Export
content = content.replace(
  /<button\s+className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"\s*>\s*<FiDownload size=\{14\} \/> Export\s*<\/button>/,
  `<PermissionGuard permission="products.export">
            <button 
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <FiDownload size={14} /> Export
            </button>
          </PermissionGuard>`
);

fs.writeFileSync('src/admin/components/commerce/products/ProductToolbar.jsx', content);
