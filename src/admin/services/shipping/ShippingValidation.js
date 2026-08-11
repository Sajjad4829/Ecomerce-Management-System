export const validateShipment = (data) => {
  const errors = {};
  if (!data.orderId) errors.orderId = 'Order ID is required';
  if (!data.carrierId) errors.carrierId = 'Carrier is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateDelivery = (data) => {
  const errors = {};
  if (!data.shipmentId) errors.shipmentId = 'Shipment ID is required';
  if (!data.scheduledDate) errors.scheduledDate = 'Scheduled date is required';
  return { isValid: Object.keys(errors).length === 0, errors };
};
