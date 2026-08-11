export const validateSupplier = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Supplier name is required';
  if (!data.code) errors.code = 'Supplier code is required';
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Invalid email format';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validatePurchaseOrder = (data) => {
  const errors = {};
  if (!data.supplierId) errors.supplierId = 'Supplier is required';
  if (!data.warehouseId) errors.warehouseId = 'Warehouse is required';
  if (!data.items || data.items.length === 0) errors.items = 'At least one item is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};
