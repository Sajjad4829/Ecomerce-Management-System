const fs = require('fs');
let appContent = fs.readFileSync('src/App.jsx', 'utf8');

// Remove the old catalog/inventory routes
appContent = appContent.replace(/<Route path="catalog\/inventory" element={<InventoryDashboard \/>} \/>\n/g, '');
appContent = appContent.replace(/<Route path="catalog\/inventory\/movements" element={<StockMovements \/>} \/>\n/g, '');
appContent = appContent.replace(/<Route path="catalog\/inventory\/low-stock" element={<LowStockManager \/>} \/>\n/g, '');

appContent = appContent.replace(/<Route path="catalog\/warehouses" element={<WarehouseManager \/>} \/>\n/g, '');
appContent = appContent.replace(/<Route path="catalog\/warehouses\/new" element={<WarehouseEditor \/>} \/>\n/g, '');
appContent = appContent.replace(/<Route path="catalog\/warehouses\/:id" element={<WarehouseEditor \/>} \/>\n/g, '');

fs.writeFileSync('src/App.jsx', appContent);
