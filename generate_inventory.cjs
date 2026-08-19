const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'adjustments/StockAdjustmentForm', title: 'Stock Adjustments', desc: 'Adjust stock levels' },
  { path: 'transfers/StockTransferBuilder', title: 'New Transfer', desc: 'Create a stock transfer' },
  { path: 'transfers/StockTransferDetail', title: 'Transfer Detail', desc: 'View transfer details' },
  { path: 'low-stock/LowStockManager', title: 'Low Stock', desc: 'Manage low stock items' },
  { path: 'out-of-stock/OutOfStockManager', title: 'Out of Stock', desc: 'Manage out of stock items' },
  { path: 'history/InventoryHistory', title: 'Inventory History', desc: 'View inventory history' },
  { path: 'suppliers/SupplierManager', title: 'Suppliers', desc: 'Manage suppliers' },
  { path: 'suppliers/SupplierForm', title: 'New Supplier', desc: 'Create a supplier' },
  { path: 'suppliers/SupplierDetail', title: 'Supplier Detail', desc: 'View supplier details' },
  { path: 'purchase-orders/PurchaseOrderManager', title: 'Purchase Orders', desc: 'Manage purchase orders' },
  { path: 'purchase-orders/PurchaseOrderBuilder', title: 'New Purchase Order', desc: 'Create a purchase order' },
  { path: 'purchase-orders/PurchaseOrderDetail', title: 'Purchase Order Detail', desc: 'View purchase order details' },
  { path: 'receiving/GoodsReceiving', title: 'Goods Receiving', desc: 'Receive goods' },
  { path: 'receiving/ReceivingDetail', title: 'Receiving Detail', desc: 'View receiving details' },
  { path: 'warehouses/WarehouseEditor', title: 'New Warehouse', desc: 'Create or edit a warehouse' },
  { path: 'warehouses/WarehouseDetail', title: 'Warehouse Detail', desc: 'View warehouse details' },
  { path: 'movements/StockMovementDetail', title: 'Movement Detail', desc: 'View stock movement details' },
  { path: 'valuation/InventoryValuation', title: 'Inventory Valuation', desc: 'View inventory valuation' },
  { path: 'forecast/InventoryForecast', title: 'Inventory Forecast', desc: 'View inventory forecast' },
  { path: 'analytics/InventoryAnalytics', title: 'Inventory Analytics', desc: 'View inventory analytics' },
  { path: 'alerts/InventoryAlerts', title: 'Inventory Alerts', desc: 'Manage inventory alerts' },
  { path: 'settings/InventorySettings', title: 'Inventory Settings', desc: 'Manage inventory settings' },
];

pages.forEach(page => {
  const fullPath = path.join(__dirname, `src/admin/pages/inventory/${page.path}.jsx`);
  const componentName = page.path.split('/').pop();
  
  if (!fs.existsSync(fullPath)) {
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(fullPath, `import React from 'react';
import PlaceholderPage from '../PlaceholderPage';

export default function ${componentName}() {
  return <PlaceholderPage title="${page.title}" description="${page.desc}" />;
}
`);
  }
});
