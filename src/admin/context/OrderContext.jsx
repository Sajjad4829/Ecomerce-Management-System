import React, { createContext, useContext, useState } from 'react';
import { auditService } from './audit/AuditStore';
import { auditService as realAuditService } from '../services/audit/AuditService';

const MOCK_ORDERS = [
  {
    id: 'ORD-2026-1102',
    customer: { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', phone: '+1 555-0100' },
    status: 'Pending',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Unfulfilled',
    date: '2026-08-08T10:00:00Z',
    items: [
      { id: 'item-1', product: 'Lounge Chair', sku: 'FUR-LC-001', quantity: 2, price: 599.00, fulfillmentStatus: 'Unfulfilled' },
      { id: 'item-2', product: 'Ceramic Vase', sku: 'DEC-CV-002', quantity: 1, price: 49.00, fulfillmentStatus: 'Unfulfilled' }
    ],
    totals: { subtotal: 1247.00, discount: 0, shipping: 50.00, tax: 103.76, grandTotal: 1400.76 },
    shippingAddress: { firstName: 'John', lastName: 'Doe', address1: '123 Main St', city: 'New York', state: 'NY', zip: '10001' },
    billingAddress: { firstName: 'John', lastName: 'Doe', address1: '123 Main St', city: 'New York', state: 'NY', zip: '10001' },
    shippingMethod: 'Standard Shipping',
    notes: { customer: 'Please leave at the front door.', internal: [] },
    timeline: [
      { id: 'ev_1', type: 'order_created', date: '2026-08-08T10:00:00Z', note: 'Order created.' },
      { id: 'ev_2', type: 'payment_updated', date: '2026-08-08T10:01:10Z', note: 'Payment Succeeded.' }
    ],
    transactions: [{ id: 'TXN-1001', amount: 1400.76, method: 'Credit Card', status: 'Succeeded' }]
  },
  {
    id: 'ORD-2026-1103',
    customer: { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0200' },
    status: 'Processing',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Processing',
    date: '2026-08-07T14:30:00Z',
    items: [
      { id: 'item-3', product: 'Dining Table', sku: 'FUR-DT-003', quantity: 1, price: 1299.00, fulfillmentStatus: 'Processing' }
    ],
    totals: { subtotal: 1299.00, discount: 100, shipping: 150.00, tax: 107.92, grandTotal: 1456.92 },
    shippingAddress: { firstName: 'Jane', lastName: 'Smith', address1: '456 Elm St', city: 'Los Angeles', state: 'CA', zip: '90001' },
    billingAddress: { firstName: 'Jane', lastName: 'Smith', address1: '456 Elm St', city: 'Los Angeles', state: 'CA', zip: '90001' },
    shippingMethod: 'White Glove Delivery',
    notes: { customer: '', internal: [{ id: 'n1', text: 'VIP Customer', date: '2026-08-07T15:00:00Z' }] },
    timeline: [
      { id: 'ev_1', type: 'order_created', date: '2026-08-07T14:30:00Z', note: 'Order created.' },
      { id: 'ev_2', type: 'payment_updated', date: '2026-08-07T14:35:10Z', note: 'Payment Succeeded.' },
      { id: 'ev_3', type: 'order_processing', date: '2026-08-07T15:00:00Z', note: 'Order moved to processing.' }
    ],
    transactions: [{ id: 'TXN-1002', amount: 1456.92, method: 'Credit Card', status: 'Succeeded' }]
  },
  {
    id: 'ORD-2026-1104',
    customer: { id: 'CUST-003', name: 'Alice Wong', email: 'alice@example.com', phone: '+1 555-0300' },
    status: 'On Hold',
    paymentStatus: 'Pending',
    fulfillmentStatus: 'Unfulfilled',
    date: '2026-08-06T09:15:00Z',
    items: [
      { id: 'item-4', product: 'Velvet Sofa', sku: 'FUR-VS-004', quantity: 1, price: 1899.00, fulfillmentStatus: 'Unfulfilled' }
    ],
    totals: { subtotal: 1899.00, discount: 0, shipping: 99.00, tax: 159.84, grandTotal: 2157.84 },
    shippingAddress: { firstName: 'Alice', lastName: 'Wong', address1: '789 Oak Ave', city: 'Chicago', state: 'IL', zip: '60007' },
    billingAddress: { firstName: 'Alice', lastName: 'Wong', address1: '789 Oak Ave', city: 'Chicago', state: 'IL', zip: '60007' },
    shippingMethod: 'Standard Shipping',
    notes: { customer: '', internal: [{ id: 'n2', text: 'Awaiting fraud check on payment', date: '2026-08-06T10:00:00Z' }] },
    timeline: [
      { id: 'ev_1', type: 'order_created', date: '2026-08-06T09:15:00Z', note: 'Order created.' },
      { id: 'ev_2', type: 'order_hold', date: '2026-08-06T10:00:00Z', note: 'Order placed on hold due to payment verification.' }
    ],
    transactions: [{ id: 'TXN-1003', amount: 2157.84, method: 'Credit Card', status: 'Pending' }]
  }
];

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const getOrder = (id) => orders.find(o => o.id === id);

  const updateOrderStatus = (id, newStatus, reason = '') => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        const event = {
          id: `ev_\${Date.now()}`,
          type: newStatus === 'Confirmed' ? 'order_confirmed' : 
                newStatus === 'Processing' ? 'order_processing' : 
                newStatus === 'Cancelled' ? 'order_cancelled' : 
                newStatus === 'On Hold' ? 'order_hold' : 'order_updated',
          date: new Date().toISOString(),
          note: `Status changed to \${newStatus}. \${reason}`
        };
        
        realAuditService.createAuditEvent({
          action: 'STATUS_CHANGE',
          module: 'Orders',
          resourceType: 'Order',
          resourceId: id,
          resourceName: o.id,
          severity: newStatus === 'Cancelled' ? 'High' : 'Low',
          metadata: { oldStatus: o.status, newStatus, reason }
        });

        return {
          ...o,
          status: newStatus,
          timeline: [...o.timeline, event]
        };
      }
      return o;
    }));
  };

  const addInternalNote = (id, noteText) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        return {
          ...o,
          notes: {
            ...o.notes,
            internal: [...o.notes.internal, { id: `n_\${Date.now()}`, text: noteText, date: new Date().toISOString() }]
          }
        };
      }
      return o;
    }));
  };
  
  const updateFulfillmentStatus = (id, newStatus, note = '') => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
         const event = {
          id: `ev_\${Date.now()}`,
          type: 'fulfillment_updated',
          date: new Date().toISOString(),
          note: `Fulfillment status updated to \${newStatus}. \${note}`
        };
        
        realAuditService.createAuditEvent({
          action: 'FULFILLMENT_UPDATE',
          module: 'Orders',
          resourceType: 'Order',
          resourceId: id,
          resourceName: o.id,
          severity: 'Medium',
          metadata: { oldStatus: o.fulfillmentStatus, newStatus, note }
        });

        return {
          ...o,
          fulfillmentStatus: newStatus,
          timeline: [...o.timeline, event]
        }
      }
      return o;
    }))
  }

  const value = React.useMemo(() => ({
    orders,
    getOrder,
    updateOrderStatus,
    addInternalNote,
    updateFulfillmentStatus
  }), [orders]);

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
