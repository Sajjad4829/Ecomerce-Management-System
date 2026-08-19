// Mock service for order operations
export const OrderService = {
  getOrders: async () => {
    return [];
  },
  getOrder: async (id) => {
    return null;
  },
  updateOrderStatus: async (id, status) => {
    return { id, status };
  },
  cancelOrder: async (id, reason) => {
    return { id, status: 'cancelled', cancelReason: reason };
  },
  getFulfillments: async () => {
    return [];
  },
  assignWarehouse: async (orderId, warehouseId) => {
    return { orderId, warehouseId };
  },
  createFulfillment: async (data) => {
    return { id: `ful-${Date.now()}`, ...data };
  },
  getShipments: async () => {
    return [];
  },
  createShipment: async (data) => {
    return { id: `shp-${Date.now()}`, ...data };
  },
  getReturns: async () => {
    return [];
  },
  createReturn: async (data) => {
    return { id: `ret-${Date.now()}`, ...data };
  },
  getRefunds: async () => {
    return [];
  },
  getInvoices: async () => {
    return [];
  },
  addOrderNote: async (orderId, note) => {
    return { id: `note-${Date.now()}`, orderId, content: note, createdAt: new Date().toISOString() };
  }
};
