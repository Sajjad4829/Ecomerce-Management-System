const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

// Replace OrderProvider import
code = code.replace(
  "import { OrderProvider } from './admin/context/OrderContext';",
  "import { OrderProvider } from './admin/context/orders/OrderContext';"
);

// Remove old order imports
code = code.replace("import OrderDashboard from './admin/pages/commerce/orders/OrderDashboard';\n", "");
code = code.replace("import OrderManager from './admin/pages/commerce/orders/OrderManager';\n", "");
code = code.replace("import OrderDetail from './admin/pages/commerce/orders/OrderDetail';\n", "");

// Add new imports
const newImports = `
import OrderLayout from './admin/layouts/OrderLayout';
import OrderDashboard from './admin/pages/orders/OrderDashboard';
import OrderDetail from './admin/pages/orders/OrderDetail';
import {
  FulfillmentCenter,
  ShipmentManager,
  ReturnManager,
  RefundManager,
  InvoiceCenter,
  OrderAnalytics as OrdersAnalyticsDashboard
} from './admin/pages/orders/PlaceholderPages';
`;

// Just insert the new imports somewhere near line 230
code = code.replace("import FulfillmentManager from './admin/pages/commerce/fulfillment/FulfillmentManager';", newImports + "\nimport FulfillmentManager from './admin/pages/commerce/fulfillment/FulfillmentManager';");

// Replace the routing
const oldRoutes = `<Route path="orders">
            <Route index element={<OrderDashboard />} />
            <Route path="list" element={<OrderManager />} />
            <Route path=":id" element={<OrderDetail />} />
          </Route>`;

const newRoutes = `<Route path="orders" element={<OrderLayout />}>
            <Route index element={<OrderDashboard />} />
            <Route path="fulfillment" element={<FulfillmentCenter />} />
            <Route path="shipments" element={<ShipmentManager />} />
            <Route path="returns" element={<ReturnManager />} />
            <Route path="refunds" element={<RefundManager />} />
            <Route path="invoices" element={<InvoiceCenter />} />
            <Route path="analytics" element={<OrdersAnalyticsDashboard />} />
            <Route path=":orderId" element={<OrderDetail />} />
          </Route>`;

code = code.replace(oldRoutes, newRoutes);

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx patched successfully');
