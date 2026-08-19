export const ProcurementService = {
  getSuppliers: async () => [],
  getSupplier: async (id) => ({ id }),
  createSupplier: async (data) => ({ id: `sup-${Date.now()}`, ...data }),
  updateSupplier: async (id, data) => ({ id, ...data }),
  getPurchaseRequests: async () => [],
  createPurchaseRequest: async (data) => ({ id: `pr-${Date.now()}`, ...data }),
  approvePurchaseRequest: async (id) => ({ id, status: 'Approved' }),
  getPurchaseOrders: async () => [],
  createPurchaseOrder: async (data) => ({ id: `po-${Date.now()}`, ...data }),
  updatePurchaseOrderStatus: async (id, status) => ({ id, status }),
  getReceiving: async () => [],
  receiveGoods: async (poId, data) => ({ id: `rec-${Date.now()}`, poId, ...data }),
  getSupplierProducts: async (supplierId) => [],
  getProcurementAnalytics: async () => ({})
};
