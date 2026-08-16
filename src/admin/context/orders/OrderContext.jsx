import React, { createContext, useContext, useState, useMemo } from 'react';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-5001',
      customerId: 'CUST-1001',
      customerName: 'Eleanor Rigby',
      email: 'eleanor.rigby@example.com',
      date: '2024-05-12T14:30:00Z',
      status: 'processing',
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      warehouseId: 'WH-1',
      total: 1245.50,
      currency: 'USD',
      campaignId: 'CMP-001',
      promotionId: 'pro-1',
      couponCode: 'SUMMER20',
      discountAmount: 249.10, // 20% off
      items: [
        { id: 'item-1', name: 'Velvet Sofa', sku: 'SOFA-VEL-BLU', quantity: 1, price: 1200.00 },
        { id: 'item-2', name: 'Throw Pillow', sku: 'PIL-COT-WHT', quantity: 2, price: 22.75 }
      ],
      shippingAddress: { name: 'Eleanor Rigby', address: '123 Abbey Road', city: 'London', postalCode: 'NW8 9AY', country: 'UK' },
      billingAddress: { name: 'Eleanor Rigby', address: '123 Abbey Road', city: 'London', postalCode: 'NW8 9AY', country: 'UK' },
    },
    {
      id: 'ORD-5002',
      customerId: 'CUST-1002',
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      date: '2024-05-11T09:15:00Z',
      status: 'shipped',
      paymentStatus: 'paid',
      fulfillmentStatus: 'shipped',
      warehouseId: 'WH-2',
      total: 3450.00,
      currency: 'USD',
      campaignId: 'CMP-001',
      promotionId: 'pro-2',
      discountAmount: 0, // Free shipping
      items: [
        { id: 'item-3', name: 'Oak Dining Table', sku: 'TAB-OAK-LG', quantity: 1, price: 3450.00 }
      ],
      shippingAddress: { name: 'John Doe', address: '456 Main St', city: 'New York', postalCode: '10001', country: 'US' },
      billingAddress: { name: 'John Doe', address: '456 Main St', city: 'New York', postalCode: '10001', country: 'US' },
    },
    {
      id: 'ORD-5003',
      customerId: 'CUST-1003',
      customerName: 'Alice Smith',
      email: 'alice@example.com',
      date: '2024-05-10T16:45:00Z',
      status: 'delivered',
      paymentStatus: 'paid',
      fulfillmentStatus: 'fulfilled',
      warehouseId: 'WH-1',
      total: 890.00,
      currency: 'USD',
      items: [
        { id: 'item-4', name: 'Ceramic Vase', sku: 'VASE-CER-WHT', quantity: 1, price: 89.00 },
        { id: 'item-5', name: 'Lounge Chair', sku: 'CHR-LNG-GRY', quantity: 1, price: 801.00 }
      ],
      shippingAddress: { name: 'Alice Smith', address: '789 Oak Ave', city: 'Austin', postalCode: '78701', country: 'US' },
      billingAddress: { name: 'Alice Smith', address: '789 Oak Ave', city: 'Austin', postalCode: '78701', country: 'US' },
    },
    {
      id: 'ORD-5004',
      customerId: 'CUST-1004',
      customerName: 'Bob Johnson',
      email: 'bob.j@example.com',
      date: '2024-05-09T11:20:00Z',
      status: 'cancelled',
      paymentStatus: 'refunded',
      fulfillmentStatus: 'unfulfilled',
      warehouseId: null,
      total: 150.00,
      currency: 'USD',
      items: [
        { id: 'item-6', name: 'Table Lamp', sku: 'LAMP-TBL-BRS', quantity: 1, price: 150.00 }
      ],
      shippingAddress: { name: 'Bob Johnson', address: '321 Pine Rd', city: 'Seattle', postalCode: '98101', country: 'US' },
      billingAddress: { name: 'Bob Johnson', address: '321 Pine Rd', city: 'Seattle', postalCode: '98101', country: 'US' },
    }
  ]);

  const [fulfillments, setFulfillments] = useState([
     { id: 'FUL-101', orderId: 'ORD-5002', warehouseId: 'WH-2', status: 'shipped', items: [{ sku: 'TAB-OAK-LG', quantity: 1 }], createdAt: '2024-05-11T14:00:00Z' },
     { id: 'FUL-102', orderId: 'ORD-5003', warehouseId: 'WH-1', status: 'completed', items: [{ sku: 'VASE-CER-WHT', quantity: 1 }, { sku: 'CHR-LNG-GRY', quantity: 1 }], createdAt: '2024-05-10T18:00:00Z' }
  ]);

  const [shipments, setShipments] = useState([
     { id: 'SHP-201', orderId: 'ORD-5002', carrier: 'FedEx', trackingNumber: '123456789012', status: 'in_transit', createdAt: '2024-05-11T15:30:00Z' },
     { id: 'SHP-202', orderId: 'ORD-5003', carrier: 'UPS', trackingNumber: '1Z9999999999999999', status: 'delivered', createdAt: '2024-05-10T19:00:00Z' }
  ]);
  
  const [invoices, setInvoices] = useState([
    { id: 'INV-5001', orderId: 'ORD-5001', date: '2024-05-12T14:30:00Z', status: 'paid', customerName: 'Eleanor Rigby' },
    { id: 'INV-5002', orderId: 'ORD-5002', date: '2024-05-11T09:15:00Z', status: 'paid', customerName: 'John Doe' },
  ]);

  const getOrder = (id) => orders.find(o => o.id === id);
  const getOrderFulfillments = (orderId) => fulfillments.filter(f => f.orderId === orderId);
  const getOrderShipments = (orderId) => shipments.filter(s => s.orderId === orderId);
  
  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    import('../../services/notification/NotificationService').then(({ notificationService }) => {
      notificationService.createNotification({
        type: 'Order',
        title: `Order Status Changed`,
        message: `Order #${id} is now ${status}.`,
        priority: 'Normal',
        module: 'Orders',
        entityId: id,
        entityType: 'Order',
        eventId: `ord_stat_${id}_${status}`,
        actionUrl: `/admin/orders/${id}`
      });
    });
  };
  
  const addOrder = (order) => {
    setOrders([order, ...orders]);
    import('../../services/notification/NotificationService').then(({ notificationService }) => {
      notificationService.createNotification({
        type: 'Order',
        title: `New Order Received`,
        message: `Order #${order.id} has been placed.`,
        priority: 'Normal',
        module: 'Orders',
        entityId: order.id,
        entityType: 'Order',
        eventId: `ord_new_${order.id}`,
        actionUrl: `/admin/orders/${order.id}`
      });
    });
  };

  const fulfillOrder = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'shipped', fulfillmentStatus: 'shipped' } : o));
    import('../../services/notification/NotificationService').then(({ notificationService }) => {
      notificationService.createNotification({
        type: 'Order',
        title: `Order Shipped`,
        message: `Order #${id} has been shipped.`,
        priority: 'Normal',
        module: 'Orders',
        entityId: id,
        entityType: 'Order',
        eventId: `ord_shp_${id}`,
        actionUrl: `/admin/orders/${id}`
      });
    });
  };

  const cancelOrder = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'cancelled', paymentStatus: 'refunded', fulfillmentStatus: 'cancelled' } : o));
    import('../../services/notification/NotificationService').then(({ notificationService }) => {
      notificationService.createNotification({
        type: 'Order',
        title: `Order Cancelled`,
        message: `Order #${id} has been cancelled.`,
        priority: 'High',
        module: 'Orders',
        entityId: id,
        entityType: 'Order',
        eventId: `ord_can_${id}`,
        actionUrl: `/admin/orders/${id}`
      });
    });
  };

  const contextValue = useMemo(() => ({
    orders,
    fulfillments,
    shipments,
    invoices,
    getOrder,
    getOrderFulfillments,
    getOrderShipments,
    updateOrderStatus,
    cancelOrder,
    addOrder,
    fulfillOrder
  }), [orders, fulfillments, shipments, invoices]);

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
