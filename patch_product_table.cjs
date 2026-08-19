const fs = require('fs');
let content = fs.readFileSync('src/admin/components/commerce/products/ProductTable.jsx', 'utf8');

// Add import
if (!content.includes('PermissionGuard')) {
  content = content.replace(
    "import { FiMoreVertical, FiEdit2, FiTrash2, FiEye, FiCopy } from 'react-icons/fi';",
    "import { FiMoreVertical, FiEdit2, FiTrash2, FiEye, FiCopy } from 'react-icons/fi';\nimport { PermissionGuard } from '../../../components/rbac/Guards';"
  );
}

// Wrap Edit
content = content.replace(
  /<button\s+onClick=\{[\s\S]*?onEdit[\s\S]*?Edit\s+<\/button>/,
  `<PermissionGuard permission="products.edit">
            $&
          </PermissionGuard>`
);

// Wrap Delete
content = content.replace(
  /<button\s+onClick=\{[\s\S]*?onDelete[\s\S]*?Delete\s+<\/button>/,
  `<PermissionGuard permission="products.delete">
            $&
          </PermissionGuard>`
);

fs.writeFileSync('src/admin/components/commerce/products/ProductTable.jsx', content);
