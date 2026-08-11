const fs = require('fs');
let content = fs.readFileSync('src/admin/components/Sidebar.jsx', 'utf8');

const inventoryItem = "  { label: 'Inventory', icon: FiBox, path: '/admin/inventory', requiredPermission: 'inventory.view' },\n";

if (!content.includes("'Inventory'")) {
  content = content.replace(
    /\{ label: 'Orders', icon: FiShoppingBag, path: '\/admin\/orders', requiredPermission: 'orders.view' \},/,
    inventoryItem + "  { label: 'Orders', icon: FiShoppingBag, path: '/admin/orders', requiredPermission: 'orders.view' },"
  );
  fs.writeFileSync('src/admin/components/Sidebar.jsx', content);
}
