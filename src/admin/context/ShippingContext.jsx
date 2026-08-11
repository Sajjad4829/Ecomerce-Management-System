import React, { createContext, useContext, useState } from 'react';

const ShippingContext = createContext();

export function ShippingProvider({ children }) {
  const [shipments, setShipments] = useState([
    {
      id: 'SHP-2026-001',
      orderId: 'ORD-8492',
      customer: { name: 'Sarah Jenkins', email: 'sarah@example.com', phone: '(555) 123-4567' },
      carrier: 'Premium Furniture Delivery',
      shippingMethod: 'White-Glove Delivery',
      trackingNumber: 'TRK-2026-000001',
      status: 'In Transit',
      createdAt: '2026-08-05T10:00:00Z',
      estimatedDelivery: '2026-08-10T14:00:00Z',
      scheduledDelivery: { date: '2026-08-10', slot: 'Afternoon (12:00 - 15:00)' },
      deliveryInstructions: 'Gate code 1234, please call before arrival.',
      packages: [
        { id: 'PKG-1', number: 1, weight: 120, length: 80, width: 40, height: 40, contents: 'Modern Leather Sofa', fragile: true, oversized: true },
        { id: 'PKG-2', number: 2, weight: 15, length: 20, width: 20, height: 20, contents: 'Sofa Legs and Hardware', fragile: false, oversized: false }
      ],
      destination: {
        recipient: 'Sarah Jenkins',
        address: '123 Main St, Apt 4B',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'US',
        phone: '(555) 123-4567'
      },
      timeline: [
        { id: 'ev_1', status: 'Draft', location: 'System', description: 'Shipment drafted', timestamp: '2026-08-04T15:00:00Z' },
        { id: 'ev_2', status: 'Label Created', location: 'Warehouse', description: 'Shipping label created', timestamp: '2026-08-05T09:00:00Z' },
        { id: 'ev_3', status: 'Shipped', location: 'Warehouse', description: 'Picked up by carrier', timestamp: '2026-08-05T14:30:00Z' },
        { id: 'ev_4', status: 'In Transit', location: 'Sort Facility, NJ', description: 'In transit to destination', timestamp: '2026-08-06T08:15:00Z' }
      ]
    },
    {
      id: 'SHP-2026-002',
      orderId: 'ORD-7210',
      customer: { name: 'Michael Chen', email: 'michael@example.com', phone: '(555) 987-6543' },
      carrier: 'National Courier',
      shippingMethod: 'Standard Delivery',
      trackingNumber: 'TRK-2026-000002',
      status: 'Delivered',
      createdAt: '2026-08-01T09:00:00Z',
      estimatedDelivery: '2026-08-04T18:00:00Z',
      scheduledDelivery: null,
      deliveryInstructions: 'Leave at front porch.',
      packages: [
        { id: 'PKG-3', number: 1, weight: 25, length: 30, width: 30, height: 15, contents: 'Ceramic Table Lamp', fragile: true, oversized: false }
      ],
      destination: {
        recipient: 'Michael Chen',
        address: '456 Oak Ave',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102',
        country: 'US',
        phone: '(555) 987-6543'
      },
      timeline: [
        { id: 'ev_5', status: 'Draft', location: 'System', description: 'Shipment drafted', timestamp: '2026-08-01T09:00:00Z' },
        { id: 'ev_6', status: 'Shipped', location: 'Warehouse', description: 'Picked up', timestamp: '2026-08-01T16:00:00Z' },
        { id: 'ev_7', status: 'Out for Delivery', location: 'Local Hub, CA', description: 'Out for delivery', timestamp: '2026-08-04T07:30:00Z' },
        { id: 'ev_8', status: 'Delivered', location: 'Front Porch', description: 'Delivered successfully', timestamp: '2026-08-04T13:45:00Z' }
      ]
    },
    {
      id: 'SHP-2026-003',
      orderId: 'ORD-9999',
      customer: { name: 'Emma Wilson', email: 'emma@example.com', phone: '(555) 111-2222' },
      carrier: 'Local Courier',
      shippingMethod: 'Express Delivery',
      trackingNumber: 'TRK-2026-000003',
      status: 'Ready to Ship',
      createdAt: '2026-08-08T08:00:00Z',
      estimatedDelivery: '2026-08-09T18:00:00Z',
      scheduledDelivery: null,
      deliveryInstructions: '',
      packages: [
         { id: 'PKG-4', number: 1, weight: 10, length: 15, width: 15, height: 10, contents: 'Decorative Pillows x2', fragile: false, oversized: false }
      ],
      destination: {
        recipient: 'Emma Wilson',
        address: '789 Pine Rd',
        city: 'Seattle',
        state: 'WA',
        zip: '98101',
        country: 'US',
        phone: '(555) 111-2222'
      },
      timeline: [
        { id: 'ev_9', status: 'Draft', location: 'System', description: 'Shipment drafted', timestamp: '2026-08-08T08:00:00Z' },
        { id: 'ev_10', status: 'Ready to Ship', location: 'Warehouse', description: 'Packages packed and ready', timestamp: '2026-08-08T09:30:00Z' }
      ]
    }
  ]);

  const [carriers, setCarriers] = useState([
    { id: 'CAR-001', name: 'Internal Delivery Team', type: 'Internal', status: 'Active', supportedMethods: ['White-Glove Delivery', 'Store Pickup'], trackingSupport: true, lastUpdated: '2026-08-01' },
    { id: 'CAR-002', name: 'National Courier', type: 'Third-Party Logistics', status: 'Active', supportedMethods: ['Standard Delivery', 'Express Delivery'], trackingSupport: true, lastUpdated: '2026-07-15' },
    { id: 'CAR-003', name: 'Local Courier', type: 'Local', status: 'Active', supportedMethods: ['Express Delivery'], trackingSupport: true, lastUpdated: '2026-08-02' }
  ]);

  const [shippingMethods, setShippingMethods] = useState([
    { id: 'SM-001', name: 'Standard Delivery', description: 'Normal delivery within 3-5 business days.', status: 'Active', estimatedDelivery: '3-5 Days', price: 15.00, sortOrder: 1 },
    { id: 'SM-002', name: 'Express Delivery', description: 'Priority delivery within 1-2 business days.', status: 'Active', estimatedDelivery: '1-2 Days', price: 35.00, sortOrder: 2 },
    { id: 'SM-003', name: 'White-Glove Delivery', description: 'Room-of-choice delivery with assembly and debris removal.', status: 'Active', estimatedDelivery: '7-14 Days', price: 150.00, sortOrder: 3 },
    { id: 'SM-004', name: 'Store Pickup', description: 'Customer pickup from designated warehouse/store.', status: 'Active', estimatedDelivery: 'Ready in 24 hours', price: 0.00, sortOrder: 4 }
  ]);

  const [shippingZones, setShippingZones] = useState([
    { id: 'SZ-001', name: 'Domestic (Contiguous US)', countries: ['US'], regions: ['All (except HI, AK)'], status: 'Active' },
    { id: 'SZ-002', name: 'Domestic (Non-Contiguous)', countries: ['US'], regions: ['Hawaii', 'Alaska'], status: 'Active' },
    { id: 'SZ-003', name: 'Local Metro Area', countries: ['US'], regions: ['New York Metro'], status: 'Active' }
  ]);

  const getShipment = (id) => shipments.find(s => s.id === id);

  const updateShipmentStatus = (id, newStatus, description, location = 'System') => {
    setShipments(prev => prev.map(s => {
      if (s.id === id) {
        const newEvent = {
          id: `ev_${Date.now()}`,
          status: newStatus,
          location,
          description,
          timestamp: new Date().toISOString()
        };
        return { ...s, status: newStatus, timeline: [...s.timeline, newEvent] };
      }
      return s;
    }));
  };

  const scheduleDelivery = (id, date, slot) => {
    setShipments(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, scheduledDelivery: { date, slot } };
      }
      return s;
    }));
  };

  const getCarrier = (id) => carriers.find(c => c.id === id);
  const getShippingMethod = (id) => shippingMethods.find(m => m.id === id);
  const getTrackingInfo = (trackingNumber) => shipments.find(s => s.trackingNumber === trackingNumber);

  return (
    <ShippingContext.Provider value={{
      shipments,
      carriers,
      shippingMethods,
      shippingZones,
      getShipment,
      updateShipmentStatus,
      scheduleDelivery,
      getCarrier,
      getShippingMethod,
      getTrackingInfo
    }}>
      {children}
    </ShippingContext.Provider>
  );
}

export const useShipping = () => useContext(ShippingContext);
