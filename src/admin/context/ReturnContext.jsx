import React, { createContext, useContext, useState } from 'react';

const ReturnContext = createContext();

export function ReturnProvider({ children }) {
  const [returns, setReturns] = useState([
    {
      id: 'RET-2026-001',
      orderId: 'ORD-8492',
      customer: { name: 'Sarah Jenkins', email: 'sarah@example.com' },
      items: [
        { id: 'item_1', productId: 'prod_1', name: 'Modern Leather Sofa', quantity: 1, reason: 'Damaged Product', condition: 'Damaged' }
      ],
      status: 'Inspection Pending',
      resolution: 'Replacement Pending',
      createdAt: '2026-08-06T10:00:00Z',
      pickup: {
        status: 'Picked Up',
        address: '123 Main St, Apt 4B, New York, NY 10001',
        scheduledDate: '2026-08-07',
        trackingNumber: 'TRK-RET-001'
      },
      inspection: null,
      timeline: [
        { id: 'ev_1', status: 'Requested', actor: 'Sarah Jenkins', description: 'Return requested for Damaged Product', timestamp: '2026-08-06T10:00:00Z' },
        { id: 'ev_2', status: 'Approved', actor: 'Admin', description: 'Return approved. Pickup scheduled.', timestamp: '2026-08-06T14:00:00Z' },
        { id: 'ev_3', status: 'Picked Up', actor: 'Courier', description: 'Item picked up from customer', timestamp: '2026-08-07T09:30:00Z' }
      ]
    },
    {
      id: 'RET-2026-002',
      orderId: 'ORD-7210',
      customer: { name: 'Michael Chen', email: 'michael@example.com' },
      items: [
        { id: 'item_2', productId: 'prod_2', name: 'Ceramic Table Lamp', quantity: 1, reason: 'Changed Mind', condition: 'New' }
      ],
      status: 'Requested',
      resolution: 'Refund Pending',
      createdAt: '2026-08-08T08:00:00Z',
      pickup: null,
      inspection: null,
      timeline: [
        { id: 'ev_4', status: 'Requested', actor: 'Michael Chen', description: 'Return requested. Reason: Changed Mind', timestamp: '2026-08-08T08:00:00Z' }
      ]
    }
  ]);

  const [refunds, setRefunds] = useState([
    {
      id: 'REF-2026-001',
      returnId: 'RET-2026-002',
      orderId: 'ORD-7210',
      customer: 'Michael Chen',
      amount: 145.00,
      method: 'Original Payment Method (Visa **** 1234)',
      status: 'Pending',
      createdAt: '2026-08-08T08:00:00Z'
    }
  ]);

  const [exchanges, setExchanges] = useState([]);

  const [returnReasons, setReturnReasons] = useState([
    { id: 'RR-1', name: 'Damaged Product', description: 'Item arrived damaged or broken.', status: 'Active', sortOrder: 1, customerVisible: true },
    { id: 'RR-2', name: 'Defective Product', description: 'Item has a manufacturing defect.', status: 'Active', sortOrder: 2, customerVisible: true },
    { id: 'RR-3', name: 'Wrong Product', description: 'Received incorrect item.', status: 'Active', sortOrder: 3, customerVisible: true },
    { id: 'RR-4', name: 'Missing Item/Parts', description: 'Parts or components are missing.', status: 'Active', sortOrder: 4, customerVisible: true },
    { id: 'RR-5', name: 'Changed Mind', description: 'No longer want the item.', status: 'Active', sortOrder: 5, customerVisible: true },
    { id: 'RR-6', name: 'Not as Expected', description: 'Item differs from description/photos.', status: 'Active', sortOrder: 6, customerVisible: true },
  ]);

  const getReturn = (id) => returns.find(r => r.id === id);

  const updateReturnStatus = (id, newStatus, description, actor = 'Admin') => {
    setReturns(prev => prev.map(r => {
      if (r.id === id) {
        const newEvent = {
          id: `ev_${Date.now()}`,
          status: newStatus,
          actor,
          description,
          timestamp: new Date().toISOString()
        };
        return { ...r, status: newStatus, timeline: [...r.timeline, newEvent] };
      }
      return r;
    }));
  };

  const schedulePickup = (id, details) => {
    setReturns(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, pickup: details };
      }
      return r;
    }));
  };

  const completeInspection = (id, inspectionDetails) => {
     setReturns(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, inspection: inspectionDetails, status: 'Inspection Completed' };
      }
      return r;
    }));
  };

  return (
    <ReturnContext.Provider value={{
      returns,
      refunds,
      exchanges,
      returnReasons,
      getReturn,
      updateReturnStatus,
      schedulePickup,
      completeInspection
    }}>
      {children}
    </ReturnContext.Provider>
  );
}

export const useReturns = () => useContext(ReturnContext);
