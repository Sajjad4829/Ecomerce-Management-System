export const validateStockAdjustment = (data) => {
  const errors = {};
  if (!data.productId) errors.productId = 'Product is required';
  if (!data.warehouseId) errors.warehouseId = 'Warehouse is required';
  if (!data.quantity || data.quantity <= 0) errors.quantity = 'Quantity must be greater than 0';
  if (!data.adjustmentType) errors.adjustmentType = 'Adjustment type is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateStockTransfer = (data, sourceAvailable) => {
  const errors = {};
  if (!data.sourceWarehouseId) errors.sourceWarehouseId = 'Source warehouse is required';
  if (!data.destinationWarehouseId) errors.destinationWarehouseId = 'Destination warehouse is required';
  if (data.sourceWarehouseId === data.destinationWarehouseId) errors.destinationWarehouseId = 'Source and destination cannot be the same';
  if (!data.productId) errors.productId = 'Product is required';
  if (!data.quantity || data.quantity <= 0) errors.quantity = 'Quantity must be greater than 0';
  if (data.quantity > sourceAvailable) errors.quantity = 'Not enough stock available in source warehouse';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const getStockStatus = (available, reorderLevel) => {
  if (available <= 0) return 'Out of Stock';
  if (available <= reorderLevel) return 'Low Stock';
  return 'In Stock';
};
