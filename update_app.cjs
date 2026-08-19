const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const newImports = `
import SKUManager from './admin/pages/inventory/skus/SKUManager';
import SKUDetail from './admin/pages/inventory/skus/SKUDetail';
import WarehouseDetail from './admin/pages/inventory/warehouses/WarehouseDetail';
import StockMovementDetail from './admin/pages/inventory/movements/StockMovementDetail';
import StockAdjustments from './admin/pages/inventory/adjustments/StockAdjustmentForm';
import StockTransfers from './admin/pages/inventory/transfers/StockTransfers';
import StockTransferBuilder from './admin/pages/inventory/transfers/StockTransferBuilder';
import StockTransferDetail from './admin/pages/inventory/transfers/StockTransferDetail';
import OutOfStockManager from './admin/pages/inventory/out-of-stock/OutOfStockManager';
import InventoryHistory from './admin/pages/inventory/history/InventoryHistory';
import SupplierManager from './admin/pages/inventory/suppliers/SupplierManager';
import SupplierForm from './admin/pages/inventory/suppliers/SupplierForm';
import SupplierDetail from './admin/pages/inventory/suppliers/SupplierDetail';
import PurchaseOrderManager from './admin/pages/inventory/purchase-orders/PurchaseOrderManager';
import PurchaseOrderBuilder from './admin/pages/inventory/purchase-orders/PurchaseOrderBuilder';
import PurchaseOrderDetail from './admin/pages/inventory/purchase-orders/PurchaseOrderDetail';
import GoodsReceiving from './admin/pages/inventory/receiving/GoodsReceiving';
import ReceivingDetail from './admin/pages/inventory/receiving/ReceivingDetail';
import InventoryValuation from './admin/pages/inventory/valuation/InventoryValuation';
import InventoryForecast from './admin/pages/inventory/forecast/InventoryForecast';
import InventoryAlerts from './admin/pages/inventory/alerts/InventoryAlerts';
import InventorySettings from './admin/pages/inventory/settings/InventorySettings';
`;

// Wait, some pages were created previously: InventoryDashboard, StockMovements, LowStockManager, WarehouseManager, WarehouseEditor
// But those are imported from 'commerce/inventory' in the old code. We need to import the new ones from 'inventory/'.
// Actually, I can just create the imports with alias or comment out the old ones if they conflict.
// Let's use unique names for the new imports if there are conflicts, or just replace the old ones.

// It's better to just replace the old imports.
appContent = appContent.replace(
  /import InventoryDashboard from '.\/admin\/pages\/commerce\/inventory\/InventoryDashboard';/,
  "import InventoryDashboard from './admin/pages/inventory/InventoryDashboard';"
);
appContent = appContent.replace(
  /import StockMovements from '.\/admin\/pages\/commerce\/inventory\/StockMovements';/,
  "import StockMovements from './admin/pages/inventory/movements/StockMovements';"
);
appContent = appContent.replace(
  /import LowStockManager from '.\/admin\/pages\/commerce\/inventory\/LowStockManager';/,
  "import LowStockManager from './admin/pages/inventory/low-stock/LowStockManager';"
);
appContent = appContent.replace(
  /import WarehouseManager from '.\/admin\/pages\/commerce\/warehouses\/WarehouseManager';/,
  "import WarehouseManager from './admin/pages/inventory/warehouses/WarehouseManager';"
);
appContent = appContent.replace(
  /import WarehouseEditor from '.\/admin\/pages\/commerce\/warehouses\/WarehouseEditor';/,
  "import WarehouseEditor from './admin/pages/inventory/warehouses/WarehouseEditor';"
);
appContent = appContent.replace(
  /import InventoryAnalytics from '.\/admin\/pages\/analytics\/InventoryAnalytics';/,
  "import InventoryAnalytics from './admin/pages/inventory/analytics/InventoryAnalytics';"
);

appContent = appContent.replace('// Other imports', '// Other imports\n' + newImports);

const newRoutes = `
          {/* Inventory System Routes */}
          <Route path="inventory">
            <Route index element={<InventoryDashboard />} />
            <Route path="skus" element={<SKUManager />} />
            <Route path="skus/:skuId" element={<SKUDetail />} />
            <Route path="warehouses" element={<WarehouseManager />} />
            <Route path="warehouses/new" element={<WarehouseEditor />} />
            <Route path="warehouses/:warehouseId" element={<WarehouseDetail />} />
            <Route path="movements" element={<StockMovements />} />
            <Route path="movements/:movementId" element={<StockMovementDetail />} />
            <Route path="adjustments" element={<StockAdjustments />} />
            <Route path="transfers" element={<StockTransfers />} />
            <Route path="transfers/new" element={<StockTransferBuilder />} />
            <Route path="transfers/:transferId" element={<StockTransferDetail />} />
            <Route path="low-stock" element={<LowStockManager />} />
            <Route path="out-of-stock" element={<OutOfStockManager />} />
            <Route path="history" element={<InventoryHistory />} />
            <Route path="suppliers" element={<SupplierManager />} />
            <Route path="suppliers/new" element={<SupplierForm />} />
            <Route path="suppliers/:supplierId" element={<SupplierDetail />} />
            <Route path="purchase-orders" element={<PurchaseOrderManager />} />
            <Route path="purchase-orders/new" element={<PurchaseOrderBuilder />} />
            <Route path="purchase-orders/:poId" element={<PurchaseOrderDetail />} />
            <Route path="receiving" element={<GoodsReceiving />} />
            <Route path="receiving/:receivingId" element={<ReceivingDetail />} />
            <Route path="valuation" element={<InventoryValuation />} />
            <Route path="forecast" element={<InventoryForecast />} />
            <Route path="analytics" element={<InventoryAnalytics />} />
            <Route path="alerts" element={<InventoryAlerts />} />
            <Route path="settings" element={<InventorySettings />} />
          </Route>
`;

// Insert the routes under <Route path="/admin" element={
appContent = appContent.replace(
  /<Route path="catalog\/pricing\/rules\/:id" element={<PricingRuleBuilder \/>} \/>/g,
  '<Route path="catalog/pricing/rules/:id" element={<PricingRuleBuilder />} />\n' + newRoutes
);

fs.writeFileSync('src/App.jsx', appContent);
