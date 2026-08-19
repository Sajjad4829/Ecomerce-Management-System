export const validateOrderAction = (action, order, payload) => {
  const errors = {};
  
  switch(action) {
    case 'CANCEL':
      if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
        errors.status = 'Cannot cancel an order in this state.';
      }
      if (!payload?.reason) errors.reason = 'Cancellation reason is required.';
      break;
    case 'ASSIGN_WAREHOUSE':
      if (!payload?.warehouseId) errors.warehouseId = 'Warehouse selection is required.';
      break;
    case 'RETURN':
      if (order.status !== 'delivered') errors.status = 'Only delivered orders can be returned.';
      if (!payload?.items || payload.items.length === 0) errors.items = 'Select items to return.';
      break;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
