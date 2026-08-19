const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

app = app.replace(
  "import ShippingDashboard from './admin/pages/commerce/shipping/ShippingDashboard';",
  `import ShippingLayout from './admin/layouts/ShippingLayout';
import {
  ShippingDashboard,
  ShipmentCenter,
  ShipmentDetail,
  DeliveryCenter,
  DeliveryDetail,
  ExceptionCenter,
  CarrierCenter,
  ShippingMethods,
  ShippingZones,
  ShippingRates,
  DeliveryAgents,
  PackageManagement,
  ShippingAnalytics
} from './admin/pages/shipping';`
);

// We need to also clean up the old shipment/shipping route blocks.
const oldRoutes = `          <Route path="shipping">
            <Route index element={<ShippingDashboard />} />
          </Route>
          
          <Route path="shipments">
            <Route index element={<ShipmentManager />} />
            <Route path=":id" element={<ShipmentDetail />} />
          </Route>

          <Route path="shipping/carriers" element={<CarrierManager />} />
          <Route path="shipping/methods" element={<ShippingMethodManager />} />
          <Route path="shipping/zones" element={<ShippingZoneManager />} />
          <Route path="shipping/settings" element={<ShippingSettings />} />`;

const newRoutes = `          {/* Shipping & Logistics Center Routes */}
          <Route path="shipping" element={<ShippingLayout />}>
            <Route index element={<ShippingDashboard />} />
            <Route path="shipments" element={<ShipmentCenter />} />
            <Route path="shipments/:shipmentId" element={<ShipmentDetail />} />
            <Route path="deliveries" element={<DeliveryCenter />} />
            <Route path="deliveries/:deliveryId" element={<DeliveryDetail />} />
            <Route path="exceptions" element={<ExceptionCenter />} />
            <Route path="exceptions/:exceptionId" element={<ExceptionCenter />} />
            <Route path="carriers" element={<CarrierCenter />} />
            <Route path="carriers/:carrierId" element={<CarrierCenter />} />
            <Route path="methods" element={<ShippingMethods />} />
            <Route path="zones" element={<ShippingZones />} />
            <Route path="rates" element={<ShippingRates />} />
            <Route path="agents" element={<DeliveryAgents />} />
            <Route path="packages" element={<PackageManagement />} />
            <Route path="analytics" element={<ShippingAnalytics />} />
          </Route>`;

app = app.replace(oldRoutes, newRoutes);

// Fix ShippingProvider import
app = app.replace(
  "import { ShippingProvider } from './admin/context/ShippingContext';",
  "import { ShippingProvider } from './admin/context/shipping/ShippingContext';"
);

fs.writeFileSync('src/App.jsx', app);
