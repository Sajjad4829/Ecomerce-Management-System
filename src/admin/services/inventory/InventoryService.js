export const InventoryService = {
  getInventory: async () => [],
  getProductInventory: async (productId) => [],
  getWarehouseInventory: async (warehouseId) => [],
  adjustStock: async (data) => ({ id: `adj-${Date.now()}`, ...data }),
  transferStock: async (data) => ({ id: `trf-${Date.now()}`, ...data }),
  reserveStock: async (data) => ({ id: `res-${Date.now()}`, ...data }),
  releaseStock: async (reservationId, reason) => ({ success: true, reservationId, reason }),
  getMovements: async () => [],
  getLowStock: async () => [],
  getOutOfStock: async () => [],
  getWarehouses: async () => [],
  createWarehouse: async (data) => ({ id: `wh-${Date.now()}`, ...data }),
  updateWarehouse: async (id, data) => ({ id, ...data }),
  getInventoryAnalytics: async () => ({})
};
