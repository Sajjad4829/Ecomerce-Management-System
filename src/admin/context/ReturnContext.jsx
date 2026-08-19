import React, { createContext, useContext, useState } from 'react';

const ReturnContext = createContext();

export function ReturnProvider({ children }) {
  const [returns, setReturns] = useState([
    {
      id: 'RET-2026-001',
      orderId: 'ORD-5001',
      customer: { name: 'Eleanor Rigby', email: 'eleanor.rigby@example.com' },
      items: [
        { id: 'item-1', productId: 'item-1', sku: 'SOFA-VEL-BLU', name: 'Velvet Sofa', quantity: 1, reason: 'Damaged Product', condition: null, warehouseId: null, price: 1200.00 }
      ],
      status: 'Requested',
      refundStatus: 'Not Requested',
      refundAmount: 0,
      createdAt: '2026-08-06T10:00:00Z',
      pickup: null,
      timeline: [
        { id: 'ev_1', status: 'Requested', actor: 'Eleanor Rigby', description: 'Return requested for Damaged Product', timestamp: '2026-08-06T10:00:00Z' }
      ]
    },
    {
      id: 'RET-2026-002',
      orderId: 'ORD-5002',
      customer: { name: 'John Doe', email: 'john.doe@example.com' },
      items: [
        { id: 'item-3', productId: 'item-3', sku: 'TAB-OAK-LG', name: 'Oak Dining Table', quantity: 1, reason: 'Changed Mind', condition: null, warehouseId: null, price: 3450.00 }
      ],
      status: 'Received',
      refundStatus: 'Pending',
      refundAmount: 0,
      createdAt: '2026-08-08T08:00:00Z',
      pickup: null,
      timeline: [
        { id: 'ev_4', status: 'Requested', actor: 'John Doe', description: 'Return requested. Reason: Changed Mind', timestamp: '2026-08-08T08:00:00Z' },
        { id: 'ev_5', status: 'Approved', actor: 'Admin', description: 'Return approved.', timestamp: '2026-08-08T09:00:00Z' },
        { id: 'ev_6', status: 'Received', actor: 'Warehouse', description: 'Return received at WH-1.', timestamp: '2026-08-09T10:00:00Z' }
      ]
    }
  ]);

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

  const markReturnReceived = (id, warehouseId) => {
    setReturns(prev => prev.map(r => {
      if (r.id === id) {
        const updatedItems = r.items.map(item => ({ ...item, warehouseId }));
        const newEvent = {
          id: `ev_${Date.now()}`,
          status: 'Received',
          actor: 'Warehouse',
          description: `Items received at ${warehouseId}`,
          timestamp: new Date().toISOString()
        };
        return { ...r, status: 'Received', items: updatedItems, timeline: [...r.timeline, newEvent] };
      }
      return r;
    }));
  };

  const updateItemCondition = (returnId, itemId, condition, notes) => {
    setReturns(prev => prev.map(r => {
      if (r.id === returnId) {
        const updatedItems = r.items.map(item => {
          if (item.id === itemId) {
            return { ...item, condition, inspectionNotes: notes };
          }
          return item;
        });
        return { ...r, items: updatedItems };
      }
      return r;
    }));
  };

  const completeInspection = (id, calculatedRefundAmount) => {
     setReturns(prev => prev.map(r => {
       if (r.id === id) {
         const newEvent = {
           id: `ev_${Date.now()}`,
           status: 'Inspection Completed',
           actor: 'Inspector',
           description: `Inspection completed. Suggested refund: ৳${calculatedRefundAmount.toLocaleString()}`,
           timestamp: new Date().toISOString()
         };
         return { 
           ...r, 
           status: 'Inspection Completed',
           refundStatus: 'Pending',
           refundAmount: calculatedRefundAmount,
           timeline: [...r.timeline, newEvent] 
         };
       }
       return r;
     }));
  };
  
  const approveRefund = (id) => {
    setReturns(prev => prev.map(r => {
      if (r.id === id) {
        const newEvent = {
          id: `ev_${Date.now()}`,
          status: 'Approved for Refund',
          actor: 'Admin',
          description: `Refund of ৳${r.refundAmount.toLocaleString()} approved.`,
          timestamp: new Date().toISOString()
        };
        return { 
          ...r, 
          status: 'Approved for Refund',
          refundStatus: 'Approved',
          timeline: [...r.timeline, newEvent] 
        };
      }
      return r;
    }));
  };
  
  const processRefund = (id) => {
    setReturns(prev => prev.map(r => {
      if (r.id === id) {
        const newEvent = {
          id: `ev_${Date.now()}`,
          status: 'Completed',
          actor: 'System',
          description: `Refund processed and return completed.`,
          timestamp: new Date().toISOString()
        };
        return { 
          ...r, 
          status: 'Completed',
          refundStatus: 'Completed',
          timeline: [...r.timeline, newEvent] 
        };
      }
      return r;
    }));
  };

  const contextValue = {
    returns,
    returnReasons,
    getReturn,
    updateReturnStatus,
    markReturnReceived,
    updateItemCondition,
    completeInspection,
    approveRefund,
    processRefund
  };

  return (
    <ReturnContext.Provider value={contextValue}>
      {children}
    </ReturnContext.Provider>
  );
}

export const useReturns = () => useContext(ReturnContext);
