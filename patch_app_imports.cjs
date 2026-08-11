const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Remove the old commerce shipping imports
app = app.replace("import ShipmentManager from './admin/pages/commerce/shipping/ShipmentManager';\n", "");
app = app.replace("import ShipmentDetail from './admin/pages/commerce/shipping/ShipmentDetail';\n", "");
app = app.replace("import CarrierManager from './admin/pages/commerce/shipping/CarrierManager';\n", "");
app = app.replace("import ShippingMethodManager from './admin/pages/commerce/shipping/ShippingMethodManager';\n", "");
app = app.replace("import ShippingZoneManager from './admin/pages/commerce/shipping/ShippingZoneManager';\n", "");
app = app.replace("import ShippingSettings from './admin/pages/commerce/shipping/ShippingSettings';\n", "");

fs.writeFileSync('src/App.jsx', app);
