export const ShippingService = {
  getShipments: async () => [],
  getShipment: async (id) => ({ id }),
  createShipment: async (data) => ({ id: `SHP-${Date.now()}`, ...data }),
  updateShipmentStatus: async (id, status) => ({ id, status }),
  getCarriers: async () => [],
  createCarrier: async (data) => ({ id: `CAR-${Date.now()}`, ...data }),
  updateCarrier: async (id, data) => ({ id, ...data }),
  getShippingMethods: async () => [],
  createShippingMethod: async (data) => ({ id: `MTH-${Date.now()}`, ...data }),
  getShippingZones: async () => [],
  createShippingZone: async (data) => ({ id: `ZON-${Date.now()}`, ...data }),
  getShippingRates: async () => [],
  getDeliveries: async () => [],
  scheduleDelivery: async (data) => ({ id: `DEL-${Date.now()}`, ...data }),
  assignAgent: async (id, agentId) => ({ id, agentId }),
  getExceptions: async () => [],
  resolveException: async (id, notes) => ({ id, status: 'Resolved', notes }),
  getShippingAnalytics: async () => ({})
};

export const ShippingAdapter = {
  createShipmentLabelPlaceholder: async () => ({ success: true }),
  trackShipmentPlaceholder: async () => ({ success: true })
};

export const DeliveryAdapter = {
  scheduleDelivery: async () => ({ success: true }),
  assignAgent: async () => ({ success: true }),
  updateDeliveryStatus: async () => ({ success: true }),
  rescheduleDeliveryPlaceholder: async () => ({ success: true }),
  getDeliveryTracking: async () => ({ success: true })
};

export const ShippingRateAdapter = {
  calculateRatePlaceholder: async () => ({ success: true }),
  getRates: async () => [],
  getZoneRates: async () => []
};
