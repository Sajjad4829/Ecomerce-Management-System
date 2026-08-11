import React, { createContext, useContext, useState, useMemo } from 'react';

const ShippingContext = createContext(null);

export const ShippingProvider = ({ children }) => {
  const [shipments, setShipments] = useState([
    { id: 'SHP-1001', orderId: 'ORD-5001', customer: 'John Doe', warehouse: 'WH-East', carrier: 'FedEx', trackingNumber: 'FDX987654321', status: 'In Transit', expectedDelivery: '2024-05-15', date: '2024-05-12' },
    { id: 'SHP-1002', orderId: 'ORD-5002', customer: 'Jane Smith', warehouse: 'WH-West', carrier: 'UPS', trackingNumber: 'UPS123456789', status: 'Ready for Pickup', expectedDelivery: '2024-05-16', date: '2024-05-13' },
    { id: 'SHP-1003', orderId: 'ORD-5003', customer: 'Bob Wilson', warehouse: 'WH-East', carrier: 'Local Courier', trackingNumber: 'LC-55555', status: 'Delivered', expectedDelivery: '2024-05-10', date: '2024-05-08' },
    { id: 'SHP-1004', orderId: 'ORD-5004', customer: 'Alice Brown', warehouse: 'WH-South', carrier: 'DHL', trackingNumber: 'DHL-9999', status: 'Delayed', expectedDelivery: '2024-05-14', date: '2024-05-11' }
  ]);

  const [carriers, setCarriers] = useState([
    { id: 'CAR-1', name: 'FedEx', code: 'FDX', serviceTypes: 'Standard, Express', coverage: 'National', status: 'Active' },
    { id: 'CAR-2', name: 'UPS', code: 'UPS', serviceTypes: 'Standard, Express, Freight', coverage: 'National', status: 'Active' },
    { id: 'CAR-3', name: 'Local Courier', code: 'LC', serviceTypes: 'Same-Day, White-Glove', coverage: 'Regional', status: 'Active' }
  ]);

  const [deliveries, setDeliveries] = useState([
    { id: 'DEL-101', shipmentId: 'SHP-1003', orderId: 'ORD-5003', customer: 'Bob Wilson', agent: 'Agent Smith', status: 'Delivered', scheduledDate: '2024-05-10', deliveryDate: '2024-05-10' },
    { id: 'DEL-102', shipmentId: 'SHP-1001', orderId: 'ORD-5001', customer: 'John Doe', agent: 'Agent Johnson', status: 'Out for Delivery', scheduledDate: '2024-05-15', deliveryDate: null }
  ]);

  const [exceptions, setExceptions] = useState([
    { id: 'EXC-001', shipmentId: 'SHP-1004', orderId: 'ORD-5004', type: 'Carrier Issue', description: 'Truck breakdown on route.', status: 'Investigating', date: '2024-05-12' }
  ]);

  const getShipment = (id) => shipments.find(s => s.id === id);
  const getCarrier = (id) => carriers.find(c => c.id === id);
  const getDelivery = (id) => deliveries.find(d => d.id === id);
  const getException = (id) => exceptions.find(e => e.id === id);

  const contextValue = useMemo(() => ({
    shipments,
    carriers,
    deliveries,
    exceptions,
    getShipment,
    getCarrier,
    getDelivery,
    getException
  }), [shipments, carriers, deliveries, exceptions]);

  return (
    <ShippingContext.Provider value={contextValue}>
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => useContext(ShippingContext);
