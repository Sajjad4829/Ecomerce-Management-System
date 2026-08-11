export const validateReturn = (data) => {
  const errors = {};
  if (!data.customerId) errors.customerId = 'Customer is required';
  if (!data.orderId) errors.orderId = 'Order is required';
  if (!data.productId) errors.productId = 'Product is required';
  if (!data.reason) errors.reason = 'Reason is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateInspection = (data) => {
  const errors = {};
  if (!data.returnId) errors.returnId = 'Return ID is required';
  if (!data.condition) errors.condition = 'Condition is required';
  if (!data.decision) errors.decision = 'Decision is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateWarrantyClaim = (data) => {
  const errors = {};
  if (!data.customerId) errors.customerId = 'Customer is required';
  if (!data.productId) errors.productId = 'Product is required';
  if (!data.issue) errors.issue = 'Issue description is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateRepair = (data) => {
  const errors = {};
  if (!data.customerId) errors.customerId = 'Customer is required';
  if (!data.productId) errors.productId = 'Product is required';
  if (!data.issue) errors.issue = 'Issue description is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateReplacement = (data) => {
  const errors = {};
  if (!data.customerId) errors.customerId = 'Customer is required';
  if (!data.originalProductId) errors.originalProductId = 'Original Product is required';
  if (!data.replacementProductId) errors.replacementProductId = 'Replacement Product is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateCase = (data) => {
  const errors = {};
  if (!data.customerId) errors.customerId = 'Customer is required';
  if (!data.type) errors.type = 'Type is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};
