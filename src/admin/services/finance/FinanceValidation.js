export const validateRefund = (data) => {
  const errors = {};
  if (!data.orderId) errors.orderId = 'Order is required';
  if (!data.amount || data.amount <= 0) errors.amount = 'Valid amount is required';
  if (!data.reason) errors.reason = 'Reason is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validatePaymentMethod = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Method name is required';
  if (!data.provider) errors.provider = 'Provider is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};
